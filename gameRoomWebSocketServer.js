'use strict';

const { storeNewJoiner, removeDisconnectedUser, getAllConnectedUsersAndPendingGameRoomRequests,
    storeNewGameRoomRequest, getAllPendingGameRooms, sendQuestionsToTheGameRoom,
    updateGameRoomsInfo } = require('./app/data/util/redisGameRoomUtil');

const config = require('./app/config/config');

const MessageTypes = {
    // When new user etered to the main room (game room tab first click)
    USER_CONNECTED: 'USER_CONNECTED',
    // When user close the brower
    USER_DISCONNECTED: 'USER_DISCONNECTED',
    // When someone create a new room to start a game
    NEW_GAME_ROOM_REQUEST: 'NEW_GAME_ROOM_REQUEST',
    // When someone join to the main room
    GAME_ROOM_UPDATE: 'GAME_ROOM_UPDATE',
    // When user entered to a new game room by clicking the join room button
    NEW_ROOM_STARTED: 'NEW_ROOM_STARTED',
    // Inform game start
    START_GAME: 'START_GAME'
};

const gameRequestTypes = {
    // When someone click on the create game button
    CREATE_GAME: 'CREATE_GAME',
    // When someone click on the join button (this request is for main room changes)
    JOIN_GAME: 'JOIN_GAME',
    // When new user etered to the main room (game room tab first click)
    JOIN_MAIN_ROOM: 'JOIN_MAIN_ROOM',
    // When someone click on the join button (this request is for new room changes)
    JOIN_SUB_ROOM: 'JOIN_SUB_ROOM'
};

const gameRoomServer = (server) => {
    // Game-Room Web-Socket
    const io = require('socket.io')(server);

    const gameRoom = io.of(`/${config.DEFAULT_SOCKET_ROOM}`);
    gameRoom.on('connection', (socket) => {

        // Join new users to the gameSpace
        socket.on('join', (data) => {

            socket.join(data.room);

            switch (data.requestType) {
                case gameRequestTypes.JOIN_MAIN_ROOM: {

                    const newJoinerID = data.userId;
                    const newJoinerUsername = data.userName;
                    // Save user ID in the user socket session for later usages
                    socket.userId = newJoinerID;
                    storeNewJoiner(newJoinerID, newJoinerUsername);
                    console.log('roomName: ' + data.room + 'UN: ' + newJoinerUsername, 'userID: ' + data.userId);
                    // Send most recent live users to all
                    getAllConnectedUsersAndPendingGameRoomRequests((allUserIds, allPendingGameRequest,
                        gameRoomsInfo, usersInfo) => {
                        gameRoom.in(data.room).emit('message', { 'messageType': MessageTypes.USER_CONNECTED,
                            'userName': data.userName, 'userID': data.userId, 'allUserIds': allUserIds, 
                            'allPendingGameRoomRequests': allPendingGameRequest,
                            'gameRoomsInfo': gameRoomsInfo, 'usersInfo': usersInfo });
                    });

                }
                    break;
                case gameRequestTypes.JOIN_SUB_ROOM: {
                    // Handle Sub Room joiners (when joining to play in the new room)
                    gameRoom.in(data.room).emit('message', { 'messageType': MessageTypes.NEW_ROOM_STARTED });
                }
                    break;
                default:
                    break;
            }
        });

        // Retrieve gameSpace messages (new Game Room Requests) and braodcast among others
        socket.on('message', (data) => {
            const requestType = data.requestType;

            switch (requestType) {
                case gameRequestTypes.CREATE_GAME: {
                    const items = { 'roomId': data.roomId, 'roomName': data.roomName,
                        'createdByUserId': data.userId };
                    console.log('New Game Request: ', items);
                    storeNewGameRoomRequest({ 'roomId': data.roomId, 'roomName': data.roomName,
                        'createdByUserId': data.userId });

                    getAllPendingGameRooms((allPendingGameRequest, gameRoomsInfo) => {
                        gameRoom.emit('message', { 'messageType': MessageTypes.NEW_GAME_ROOM_REQUEST,
                            'allPendingGameRoomRequests': allPendingGameRequest, 'gameRoomsInfo': gameRoomsInfo });
                    });
                }
                    break;
                case gameRequestTypes.JOIN_GAME: {
                    const items = { 'roomId': data.roomId, 'userId': data.userId };
                    console.log('Join Game Request: ', items);
                    updateGameRoomsInfo(() => {
                        getAllPendingGameRooms((allPendingGameRequest, gameRoomsInfo) => {
                            gameRoom.emit('message', { 'messageType': MessageTypes.GAME_ROOM_UPDATE,
                                'allPendingGameRoomRequests': allPendingGameRequest, 'gameRoomsInfo': gameRoomsInfo });
                        });
                    }, (room) => {
                        gameRoom.in(room).emit('message', { 'messageType': MessageTypes.START_GAME });
                    }, (gameRoom, room) => {
                        sendQuestionsToTheGameRoom(gameRoom, room);
                    }, data.roomId, gameRoom);
                }
                    break;
                case 'NEW_ROOM': {
                    console.log('NEW ROOM JOINER: ', data);
                    gameRoom.in(data.room).emit('message', { 'messageType': 'SUB_ROOM' });
                }
                    break;
                default:
                    break;
            }
        });

        // Track disconnected users
        socket.on('disconnect', () => {
            const disconnectedUserId = socket.userId;
            console.log('User Disconnected: ', disconnectedUserId);
            removeDisconnectedUser(disconnectedUserId);
            // Send all live users
            getAllConnectedUsersAndPendingGameRoomRequests((allUserIds, allPendingGameRequest,
                gameRoomsInfo, usersInfo) => {
                gameRoom.emit('message', { 'messageType': MessageTypes.USER_DISCONNECTED,
                    'disconnectedUserId': disconnectedUserId, 'allUserIds': allUserIds,
                    'allPendingGameRoomRequests': allPendingGameRequest,
                    'gameRoomsInfo': gameRoomsInfo, 'usersInfo': usersInfo });
            });
        });

    });
    
};

module.exports = gameRoomServer;
