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
            // TODO: makesure no duplicate
            return { ...state, liveUsers: [payload] };
        }
        case USER_CONNECTED: {
            return { ...state, userConnected: payload };
        }
        case UPDATE_PENDING_GAME_ROOM_REQUESTS: {
            // TODO: Change this logic when multiple game requests are allowed
            return { ...state, pendingGameRequests: payload };
        }
        default: {
            return state;
        }
    }

};
