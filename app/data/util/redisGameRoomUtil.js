'use strict';

/**
 * This module is the Redis Repository for the Game Room 
 */

const redisInstance = require('../connector/redisConnector');
const { USERS_LIVE, GROOMS_PENDING } = require('../../const/redisKeys');
const config = require('../../config/config');
const { getQuestion } = require('../../util/questionUtil');
const { getQuestionSessionsById } = require('../../util/questionSessionUtil');
const { createSession } = require('../../util/gameSessionUtil');

const MessageTypes = {
    FINISH_GAME: 'FINISH_GAME',
    QUESTION: 'QUESTION'
};

const storeNewJoiner = (newJoinerID, newJoinerUsername) => {
    // Store connected user detail in a Hash
    const dateTime = new Date().toLocaleString();
    redisInstance.hmset(`user:${newJoinerID}`, 'userName', newJoinerUsername, 'dateTime', dateTime);
    // Store connected user ID in 'users:live' Set
    redisInstance.sadd(USERS_LIVE, newJoinerID);
};

const removeDisconnectedUser = (userID) => {
    // Store connected user ID in 'users:live' Set
    console.log('removing user.. ', userID);
    redisInstance.srem(USERS_LIVE, userID);
    // TODO: remove from the hashmap
    redisInstance.hdel(`user:${userID}`, (err, result) => {
        console.log(result);
    });
};

// Find all info relevant for the Game Room
const findGameRoomsInfoAndUsersInfo = (callback, allLiveUsers, allPendingRooms) => {
    const roomInfoProcess = allPendingRooms.map(roomId => {
        return redisInstance.hgetall(`groom:${roomId}`, (err, result) => {
            if (!err) {
                result.gameRoomId = roomId;
                return result;
            }
        });
    });
    Promise.all(roomInfoProcess).then( (roomsInfoResult) => {
        const userInfoProcess = allLiveUsers.map(userId => {
            return redisInstance.hgetall(`user:${userId}`, (err, result) => {
                if (!err) {
                    result.userId = userId;
                    return result;
                }
            });
        });
        Promise.all(userInfoProcess).then( (usersInfoResult) => {
            callback(allLiveUsers, allPendingRooms, roomsInfoResult, usersInfoResult);
        });
    }
    );
};

const getAllConnectedUsersAndPendingGameRoomRequests = (callbackFunction) => {
    redisInstance.smembers(USERS_LIVE, (err, allLiveUsers) => {
        if (!err) {
            redisInstance.smembers(GROOMS_PENDING, (err, allPendingRooms) => {
                if (!err) {
                    findGameRoomsInfoAndUsersInfo(callbackFunction, allLiveUsers, allPendingRooms);
                }
            });
        }
    });
};

const storeNewGameRoomRequest = ({ roomId, roomName, createdByUserId }) => {
    // Store pending Game Room details in a Hash
    redisInstance.hmset(`groom:${roomId}`, 'gameRoomName', roomName, 'cratedBy', createdByUserId, 'noUsers', 0);
    // Store pending Game Room request IDs in 'gameRoomRequests:pending' Set
    redisInstance.sadd(GROOMS_PENDING, roomId);
};

const getAllPendingGameRooms = (callbackFunction) => {
    redisInstance.smembers(GROOMS_PENDING, (err, allPendingRooms) => {
        if (!err) {
            const roomInfoProcess = allPendingRooms.map(roomId => {
                return redisInstance.hgetall(`groom:${roomId}`, (err, result) => {
                    if (!err) {
                        result.gameRoomId = roomId;
                        return result;
                    }
                });
            });
            Promise.all(roomInfoProcess).then((roomsInfoResult) => {
                callbackFunction(allPendingRooms, roomsInfoResult);
            });
        }
    });
};

const updateGameRoomsInfo = (callbackFunction, callbackFunctionStartGame, callbackFunctionSendQuestions,
    roomId, gameRoom) => {
    redisInstance.hincrby(`groom:${roomId}`, 'noUsers', 1);
    redisInstance.hgetall(`groom:${roomId}`, (err, result) => {
        if (!err) {
            callbackFunction();
            if (result.noUsers >= config.QUESTION_SETTINGS.NUM_OF_USERS_PER_GAME) {
                redisInstance.srem(GROOMS_PENDING, roomId);
                redisInstance.del(`groom:${roomId}`, (err, result) => {
                    if (!err) {
                        console.log('Room Deleted. Max count met...', result);
                        callbackFunction();
                        setTimeout(() => {
                            callbackFunctionStartGame(roomId);
                        }, config.QUESTION_SETTINGS.TIME_OUT_VALUE_START_GAME_MESSAGE);
                        callbackFunctionSendQuestions(gameRoom, roomId);
                    } else {
                        console.log(err);
                    }
                });
            }
        }
    });
};

const markDownAnswers = (answeredQuestions) => {

    let accumulatedScore = 0;
    const questionTimeLimit = config.QUESTION_SETTINGS.QUESTION_TIMEOUT / 1000;
    answeredQuestions.forEach(question => {
        const randomSeconds = Math.floor((Math.random() * questionTimeLimit) + 1);
        // Due to type mismatch, we have used == here. No time to parse :D
        if (question.correctAnswer === question.userSelections.answer) {
            accumulatedScore += 50 + (questionTimeLimit - randomSeconds) / questionTimeLimit * 100;
        } else {
            if (accumulatedScore > 50) {
                accumulatedScore -= 50;
            }
        }
    });

    return Math.round(accumulatedScore);
};

const generateUserStats = async (gameRoomId) => {

    const sessions = await getQuestionSessionsById(gameRoomId);
    const userStats = sessions.map(( session ) => {
        const accumulatedScoreForUser = markDownAnswers(session.documents);
        console.log('------------------->>>>', accumulatedScoreForUser);
        return {
            userId: session.userId,
            userName: session.userName,
            marks: accumulatedScoreForUser
        };
    });
    
    const sessionStats = {
        gameSessionId: gameRoomId,
        userStats: userStats
    };

    try {
        createSession(sessionStats);
    } catch (error) {
        console.error('error: ', error);
    }
};

const sendQuestionsToTheGameRoom = (gameRoom, gameSubRoom) => {
    let count = 0;
    let question = null;
    const intervalID = setInterval(async () => {
        count = count + 1;
        if (count === config.QUESTION_SETTINGS.NUM_OF_QUESTIONS_PER_GAME) {
            clearInterval(intervalID);
            setTimeout(() => {
                gameRoom.in(gameSubRoom).emit('message', { 'messageType': MessageTypes.FINISH_GAME });
            }, config.QUESTION_SETTINGS.TIME_OUT_VALUE_END_GAME_MESSAGE);
            generateUserStats(gameSubRoom);
        }

        try {
            question = await getQuestion();  
        } catch (error) {
            console.error('Error in getting question : ', error);
            return;
        }

        gameRoom.in(gameSubRoom).emit('message', { 'messageType': MessageTypes.QUESTION,
            'qestionTemplate': question.template, 'questionId': question._id });
    }, config.QUESTION_SETTINGS.QUESTION_TIMEOUT);
};

module.exports = { storeNewJoiner, removeDisconnectedUser, getAllConnectedUsersAndPendingGameRoomRequests,
    storeNewGameRoomRequest, getAllPendingGameRooms, updateGameRoomsInfo, sendQuestionsToTheGameRoom };
