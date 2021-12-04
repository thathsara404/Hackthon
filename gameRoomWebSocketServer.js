'use strict';

const gameRoomServer = (server) => {
    // Game-Room Web-Socket
    const io = require('socket.io')(server);

    const gameRoom = io.of('/gameSpace');
    gameRoom.on('connection', (socket) => {
        console.log('CALLING..');
        socket.on('join', (data) => {
            socket.join(data.room);
            console.log('roomName: ' + data.room + 'UN: ' + data.userName, 'userID: ' + data.userId);
            gameRoom.in(data.room).emit('message', { 'userName': data.userName, 'userID': data.userId });
        });

        socket.on('message', (data) => {
            console.log(`message: ${data.msg}`);
            gameRoom.in(data.room).emit('message', data.msg);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
            gameRoom.emit('message', 'user disconnected');
        });
    });
};

module.exports = gameRoomServer;
