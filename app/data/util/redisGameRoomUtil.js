'use strict';

const redisInstance = require('../connector/redisConnector');

const storeNewJoiner = (newJoinerID, newJoinerUsername) => {
    // Store connected user detail in a Hash
    redisInstance.hmset(`user:${newJoinerID}`, 'userName', newJoinerUsername);
    // Store connected user ID in 'users:live' Set
    redisInstance.sadd('users:live', newJoinerID);
};

const removeDisconnectedUser = (userID) => {
    // Store connected user ID in 'users:live' Set
    redisInstance.srem('users:live', userID);
};

const getAllConnectedUsers = (callBackFunction) => {
    redisInstance.smembers('users:live', (err, allLiveUsers) => {
        if (!err) {
            callBackFunction(allLiveUsers);
        }
    });
};

module.exports = { storeNewJoiner, removeDisconnectedUser, getAllConnectedUsers };
