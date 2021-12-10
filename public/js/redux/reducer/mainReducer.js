'use strict';

import { UPDATE_LOGIN_STATUS, UPDATE_USER_DETAILS } from '../action/mainAction';

const initialState = {
    isLoggedIn: null,
    userDetails: null
};

export const main = (state = initialState, action) => {

    const { type, payload } = action;
    switch (type) {
        case UPDATE_LOGIN_STATUS: {
            const loginStatus = payload.loginStatus;
            return { ...state, isLoggedIn: loginStatus };
        }
        case UPDATE_USER_DETAILS: {
            const userDetails = payload.userDetails;
            return { ...state, userDetails: userDetails };
        } default: {
            return state;
        }
    }

};
