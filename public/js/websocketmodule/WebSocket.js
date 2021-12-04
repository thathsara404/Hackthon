'use strict';

import io from 'socket.io-client';
import { store } from '../redux/store';
import { USER_CONNECTED, UPDATE_PENDING_GAME_ROOM_REQUESTS, UPDATE_LIVE_USERS } from '../redux/action/gameRoomAction';
import { WebSocketAction } from './webSocketAction';

export class WebSocket {

    static connect (roomName, userName, userID) {

        this.socket = io(`/${roomName}`);

        this.socket.on('connect', () => {
            this.socket.emit('join', { 'room': roomName, 'userName': userName, 'userId': userID });
            store.dispatch({ type: USER_CONNECTED,
                payload: true });
        });

        this.socket.on('message', (message) => {
            const messageType = message.messageType;
            const userName = message.userName;
            const userId = message.userID;
            const allUserIds = message.allUserIds;
            const allPendingGameRequest = message.allPendingGameRoomRequests;
            const disconnectedUserId = message.disconnectedUserId;

            const allData = { 'messageType': messageType,
                'userName': userName, 'userId': userId, 'allUserIds': allUserIds,
                'allPendingGameRoomRequests': allPendingGameRequest, 'disconnectedUserId': disconnectedUserId };
            console.log('All Data in Message: ', allData);
            switch (messageType) {
                case WebSocketAction.NEW_USER_CONNECTED:
                    store.dispatch({ type: UPDATE_LIVE_USERS,
                        payload: message.allUserIds });
                    break;
                case WebSocketAction.USER_DISCONNECTED: 
                    store.dispatch({ type: UPDATE_LIVE_USERS,
                        payload: message.allUserIds });
                    break;
                case WebSocketAction.NEW_GAME_ROOM_REQUEST:
                    store.dispatch({ type: UPDATE_PENDING_GAME_ROOM_REQUESTS,
                        payload: allPendingGameRequest });
                    break;
                default:
                    break;
            }
            
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
