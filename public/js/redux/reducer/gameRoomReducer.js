'use strict';

import { UPDATE_LIVE_USERS, USER_CONNECTED } from '../action/gameRoomAction';

const initialState = {
    liveUsers: [],
    userConnected: false
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
            console.log('---payload------', payload);
            return { ...state, userConnected: payload };
        }
        default: {
            return state;
        }
    }

};
