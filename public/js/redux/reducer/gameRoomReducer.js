'use strict';

import { UPDATE_LIVE_USERS, USER_CONNECTED, UPDATE_PENDING_GAME_ROOM_REQUESTS } from '../action/gameRoomAction';

const initialState = {
    liveUsers: [],
    userConnected: false,
    pendingGameRequests: []
};

export const gameRoom = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case UPDATE_LIVE_USERS: {
            const liveUser = { 'userName': payload.userName, 'userId': payload.userId };
            // TODO: makesure no duplicate
            return { ...state, liveUsers: [...state.liveUsers, liveUser] };
        }
        case USER_CONNECTED: {
            return { ...state, userConnected: payload };
        }
        case UPDATE_PENDING_GAME_ROOM_REQUESTS: {
            return { ...state, pendingGameRequests: [...state.pendingGameRequests, payload] };
        }
        default: {
            return state;
        }
    }

};
