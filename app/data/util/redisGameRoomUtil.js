'use strict';

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

const getAllConnectedUsersAndPendingGameRoomRequests = (callbackFunction) => {
    redisInstance.smembers(USERS_LIVE, (err, allLiveUsers) => {
        if (!err) {
            redisInstance.smembers(GROOMS_PENDING, (err, allPendingRooms) => {
                if (!err) {
                    callbackFunction(allLiveUsers, allPendingRooms);
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
            callbackFunction(allPendingRooms);
        }
    });
};

module.exports = { storeNewJoiner, removeDisconnectedUser, getAllConnectedUsersAndPendingGameRoomRequests,
    storeNewGameRoomRequest, getAllPendingGameRooms };
