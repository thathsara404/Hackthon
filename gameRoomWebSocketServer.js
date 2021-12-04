'use strict';

const { storeNewJoiner, removeDisconnectedUser, getAllConnectedUsers } = require('./app/data/util/redisGameRoomUtil');

const MessageTypes = {
    USER_CONNECTED: 'USER_CONNECTED',
    USER_DISCONNECTED: 'USER_DISCONNECTED'
};

const gameRoomServer = (server) => {
    // Game-Room Web-Socket
    const io = require('socket.io')(server);

    const gameRoom = io.of('/gameSpace');
    gameRoom.on('connection', (socket) => {

        socket.on('join', (data) => {
            socket.join(data.room);
            const newJoinerID = data.userId;
            const newJoinerUsername = data.userName;
            // Save user ID in the user socket session for later usages
            socket.userID = newJoinerID;
            storeNewJoiner(newJoinerID, newJoinerUsername);
            console.log('roomName: ' + data.room + 'UN: ' + newJoinerUsername, 'userID: ' + data.userId);
            // Send most recent live users to all
            getAllConnectedUsers((allUserIds) => {
                gameRoom.in(data.room).emit('message', { 'messageType': MessageTypes.USER_CONNECTED,
                    'userName': data.userName, 'userID': data.userId, 'allUserIds': allUserIds });
            });
        });

        socket.on('message', (data) => {
            console.log(`message: ${data.msg}`);
            gameRoom.in(data.room).emit('message', data.msg);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
            const disconnectedUserId = socket.userID;
            removeDisconnectedUser(disconnectedUserId);
            // Send most recent live users to all
            getAllConnectedUsers((allUserIds) => {
                gameRoom.emit('message', { 'messageType': MessageTypes.USER_DISCONNECTED,
                    'userID': disconnectedUserId, 'allUserIds': allUserIds });
            });
        });

    });
    
};

module.exports = gameRoomServer;
