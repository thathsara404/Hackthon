'use strict';

const { storeNewJoiner, removeDisconnectedUser, getAllConnectedUsersAndPendingGameRoomRequests,
    storeNewGameRoomRequest, getAllPendingGameRooms } = require('./app/data/util/redisGameRoomUtil');

const MessageTypes = {
    USER_CONNECTED: 'USER_CONNECTED',
    USER_DISCONNECTED: 'USER_DISCONNECTED',
    NEW_GAME_ROOM_REQUEST: 'NEW_GAME_ROOM_REQUEST'
};

const gameRoomServer = (server) => {
    // Game-Room Web-Socket
    const io = require('socket.io')(server);

    const gameRoom = io.of('/gameSpace');
    gameRoom.on('connection', (socket) => {

        // Join new users to the gameSpace
        socket.on('join', (data) => {
            socket.join(data.room);
            const newJoinerID = data.userId;
            const newJoinerUsername = data.userName;
            // Save user ID in the user socket session for later usages
            socket.userID = newJoinerID;
            storeNewJoiner(newJoinerID, newJoinerUsername);
            console.log('roomName: ' + data.room + 'UN: ' + newJoinerUsername, 'userID: ' + data.userId);
            // Send most recent live users to all
            getAllConnectedUsersAndPendingGameRoomRequests((allUserIds, allPendingGameRequest) => {
                gameRoom.in(data.room).emit('message', { 'messageType': MessageTypes.USER_CONNECTED,
                    'userName': data.userName, 'userID': data.userId, 'allUserIds': allUserIds, 
                    'allPendingGameRoomRequests': allPendingGameRequest });
            });
        });

        // Retrieve gameSpace messages (new Game Room Requests) and braodcast among others
        socket.on('message', (data) => {
            console.log(`Room: ${data.room}`);
            // GameRoom.in(data.room).emit('message', { 'messageType': MessageTypes.NEW_GAME_ROOM_REQUEST });

            const items = { 'roomId': data.roomId, 'roomName': data.roomName,
                'createdByUserId': data.userId };
            console.log('IIIII', items);
            storeNewGameRoomRequest({ 'roomId': data.roomId, 'roomName': data.roomName,
                'createdByUserId': data.userId });

            getAllPendingGameRooms((allPendingGameRequest) => {
                gameRoom.emit('message', { 'messageType': MessageTypes.NEW_GAME_ROOM_REQUEST,
                    'allPendingGameRoomRequests': allPendingGameRequest });
            });
        });

        // Track disconnected users
        socket.on('disconnect', () => {
            console.log('user disconnected');
            const disconnectedUserId = socket.userID;
            removeDisconnectedUser(disconnectedUserId);
            // Send all live users
            getAllConnectedUsersAndPendingGameRoomRequests((allUserIds, allPendingGameRequest) => {
                gameRoom.emit('message', { 'messageType': MessageTypes.USER_DISCONNECTED,
                    'userID': disconnectedUserId, 'allUserIds': allUserIds,
                    'allPendingGameRoomRequests': allPendingGameRequest });
            });
        });

    });
    
};

module.exports = gameRoomServer;
