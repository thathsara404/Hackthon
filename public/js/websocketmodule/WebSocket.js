'use strict';

import io from 'socket.io-client';
import { store } from '../redux/store';
import { USER_CONNECTED, UPDATE_PENDING_GAME_ROOM_REQUESTS, UPDATE_LIVE_USERS,
    UPDATE_LIVE_USERS_INFO, UPDATE_PENDING_GAME_ROOM_REQUESTS_INFO,
    UPDATE_USER_STATUS_IN_SUB_ROOM, UPDATE_NEW_GAME_STARTED_STATUS, UPDATE_CURRENT_SUBROOM_ID
} from '../redux/action/gameRoomAction';
import { WebSocketAction } from './webSocketAction';

export class WebSocket {

    static connect (roomName, userName, userID) {

        this.socket = io(`/${roomName}`);

        this.socket.on('connect', () => {
            this.socket.emit('join', { 'room': roomName, 'userName': userName,
                'userId': userID, 'requestType': 'JOIN_MAIN_ROOM' });
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
            const gameRoomsInfo = message.gameRoomsInfo;
            const usersInfo = message.usersInfo;

            const allData = { 'messageType': messageType,
                'userName': userName, 'userId': userId, 'allUserIds': allUserIds,
                'allPendingGameRoomRequests': allPendingGameRequest, 'disconnectedUserId': disconnectedUserId,
                'gameRoomsInfo': gameRoomsInfo, 'usersInfo': usersInfo };
            console.log('All Data in Message: ', allData);
            switch (messageType) {
                case WebSocketAction.NEW_USER_CONNECTED:
                    store.dispatch({ type: UPDATE_LIVE_USERS,
                        payload: message.allUserIds });
                    store.dispatch({ type: UPDATE_LIVE_USERS_INFO,
                        payload: usersInfo });
                    store.dispatch({ type: UPDATE_PENDING_GAME_ROOM_REQUESTS,
                        payload: allPendingGameRequest });
                    store.dispatch({ type: UPDATE_PENDING_GAME_ROOM_REQUESTS_INFO,
                        payload: gameRoomsInfo });

                    break;
                case WebSocketAction.USER_DISCONNECTED: 
                    store.dispatch({ type: UPDATE_LIVE_USERS,
                        payload: message.allUserIds });
                    store.dispatch({ type: UPDATE_LIVE_USERS_INFO,
                        payload: usersInfo });
                    break;
                case WebSocketAction.NEW_GAME_ROOM_REQUEST:
                    store.dispatch({ type: UPDATE_PENDING_GAME_ROOM_REQUESTS,
                        payload: allPendingGameRequest });
                    store.dispatch({ type: UPDATE_PENDING_GAME_ROOM_REQUESTS_INFO,
                        payload: gameRoomsInfo });
                    break;
                case WebSocketAction.GAME_ROOM_UPDATE: 
                    store.dispatch({ type: UPDATE_PENDING_GAME_ROOM_REQUESTS,
                        payload: allPendingGameRequest });
                    store.dispatch({ type: UPDATE_PENDING_GAME_ROOM_REQUESTS_INFO,
                        payload: gameRoomsInfo });
                    break;
                default:
                    break;
            }
            
        });

    } 

    static createNewGameRoom (roomId, roomName, userId) {
        this.socket.emit('message', { 'roomId': roomId, 'roomName': roomName,
            'userId': userId, 'requestType': 'CREATE_GAME' });
    }

    static joindNewGameRoom (roomId, userId) {

        // Update Redux Status: indicating the user in a sub room
        store.dispatch({ type: UPDATE_USER_STATUS_IN_SUB_ROOM,
            payload: true });

        // Update Reducx Status with the current sub room Id
        store.dispatch({ type: UPDATE_CURRENT_SUBROOM_ID,
            payload: roomId });

        const tstmainRoom = 'gameSpace';
        const newRoomSocket = this.socket = io(`/${tstmainRoom}`);
        newRoomSocket.emit('message', { 'roomId': roomId, 'userId': userId, 'requestType': 'JOIN_GAME' });

        newRoomSocket.on('connect', () => {
            // Emiting to everybody
            newRoomSocket.emit('join', { room: roomId, 'requestType': 'JOIN_SUB_ROOM' });
        });
        newRoomSocket.emit('message', { 'roomId': roomId, 'roomName': roomId, room: roomId,
            'userId': userId, 'requestType': 'NEW_ROOM' });

        // New Room Listener
        newRoomSocket.on('message', (message) => {
            console.log('Message From New Game Room: ', message);
            const messageType = message.messageType;
            switch (messageType) {
                case WebSocketAction.START_GAME:
                    store.dispatch({ type: UPDATE_NEW_GAME_STARTED_STATUS,
                        payload: true });
                    break;
                case WebSocketAction.FINISH_GAME:
                    store.dispatch({ type: UPDATE_NEW_GAME_STARTED_STATUS,
                        payload: false });
                    store.dispatch({ type: UPDATE_CURRENT_SUBROOM_ID,
                        payload: null });
                    store.dispatch({ type: UPDATE_USER_STATUS_IN_SUB_ROOM,
                        payload: false });
                    break;
                default:
                    break;
            }
        });
    }

}
