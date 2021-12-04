'use strict';

import io from 'socket.io-client';
import { store } from '../redux/store';
import { USER_CONNECTED } from '../redux/action/gameRoomAction';

export class WebSocket {

    static connect (roomName, userName, userID) {

        const socket = io(`/${roomName}`);

        socket.on('connect', () => {
            socket.emit('join', { room: roomName, userName: userName, userId: userID });
            store.dispatch({ type: USER_CONNECTED,
                payload: true });
        });

        socket.on('message', (message) => {
            const userJoined = { 'messageType': message.messageType,
                'userName': message.userName, 'userId': message.userID };
            console.log(userJoined);
        });

    } 

    /*
     * Static sendDisconnect (socket) {
     *     socket.on('disconnect', () => {
     *         io.emit('myCustomEvent', { customEvent: 'Custom Message' });
     *         console.log('Socket disconnected: ' + _id);
     *     });
     * }
     */

}
