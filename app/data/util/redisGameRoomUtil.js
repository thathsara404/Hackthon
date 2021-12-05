'use strict';

/**
 * This module is the Redis Repository for the Game Room 
 */

const redisInstance = require('../connector/redisConnector');
const { USERS_LIVE, GROOMS_PENDING } = require('../../const/redisKeys');

const storeNewJoiner = (newJoinerID, newJoinerUsername) => {
    // Store connected user detail in a Hash
    redisInstance.hmset(`user:${newJoinerID}`, 'userName', newJoinerUsername);
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

const updateGameRoomsInfo = (callbackFunction, callbackFunctionStartGame, roomId) => {
    redisInstance.hincrby(`groom:${roomId}`, 'noUsers', 1);
    redisInstance.hgetall(`groom:${roomId}`, (err, result) => {
        if (!err) {
            if (result.noUsers >= 5) {
                redisInstance.srem(GROOMS_PENDING, roomId);
                redisInstance.del(`groom:${roomId}`, (err, result) => {
                    if (!err) {
                        console.log('Room Deleted Max count met...', result);
                        callbackFunction();
                        callbackFunctionStartGame(roomId);
                    } else {
                        console.log(err);
                    }
                });
            }
        }
    });
};

module.exports = { storeNewJoiner, removeDisconnectedUser, getAllConnectedUsersAndPendingGameRoomRequests,
    storeNewGameRoomRequest, getAllPendingGameRooms, updateGameRoomsInfo };
