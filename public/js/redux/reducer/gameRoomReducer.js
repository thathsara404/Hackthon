'use strict';

import { UPDATE_LIVE_USERS, UPDATE_LIVE_USERS_INFO, USER_CONNECTED,
    UPDATE_PENDING_GAME_ROOM_REQUESTS,
    UPDATE_PENDING_GAME_ROOM_REQUESTS_INFO, UPDATE_USER_STATUS_IN_SUB_ROOM,
    UPDATE_NEW_GAME_STARTED_STATUS, UPDATE_CURRENT_SUBROOM_ID } from '../action/gameRoomAction';

const initialState = {
    liveUsers: [],
    liveUsersInfo: [],
    userConnected: false,
    pendingGameRequests: [],
    pendingGameRequestsInfo: [],
    subRoomStatus: false,
    newGameStarted: false,
    currentSubRoomId: null
};

export const gameRoom = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case UPDATE_LIVE_USERS: {
            // TODO: makesure no duplicate
            return { ...state, liveUsers: [payload] };
        }
        case UPDATE_LIVE_USERS_INFO: {
            return { ...state, liveUsersInfo: payload };
        }
        case USER_CONNECTED: {
            return { ...state, userConnected: payload };
        }
        case UPDATE_PENDING_GAME_ROOM_REQUESTS: {
            // TODO: Change this logic when multiple game requests are allowed
            return { ...state, pendingGameRequests: payload };
        }
        case UPDATE_PENDING_GAME_ROOM_REQUESTS_INFO: {
            return { ...state, pendingGameRequestsInfo: payload };
        }
        case UPDATE_USER_STATUS_IN_SUB_ROOM: {
            return { ...state, subRoomStatus: payload };
        }
        case UPDATE_NEW_GAME_STARTED_STATUS: {
            return { ...state, newGameStarted: payload };
        }
        case UPDATE_CURRENT_SUBROOM_ID: {
            return { ...state, currentSubRoomId: payload };
        }
        default: {
            return state;
        }
    }

};
