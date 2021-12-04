'use strict';

import io from 'socket.io-client';
import { store } from '../redux/store';
import { USER_CONNECTED, UPDATE_PENDING_GAME_ROOM_REQUESTS } from '../redux/action/gameRoomAction';

export class WebSocket {

    static connect (roomName, userName, userID) {

        this.socket = io(`/${roomName}`);

        this.socket.on('connect', () => {
            this.socket.emit('join', { room: roomName, userName: userName, userId: userID });
            store.dispatch({ type: USER_CONNECTED,
                payload: true });
        });

        this.socket.on('message', (message) => {
            const userJoined = { 'messageType': message.messageType,
                'userName': message.userName, 'userId': message.userID, 'AllUserIds': message.allUserIds,
                'allPendingGameRoomRequests': message.allPendingGameRoomRequests };
            store.dispatch({ type: UPDATE_PENDING_GAME_ROOM_REQUESTS,
                payload: message.allPendingGameRoomRequests });
            console.log(userJoined);
        });

    } 

    static createNewGameRoom (roomId, roomName, userId) {
        this.socket.emit('message', { 'roomId': roomId, 'roomName': roomName, 'userId': userId });
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
