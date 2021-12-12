'use strict';

import { UPDATE_LOGIN_STATUS, UPDATE_USER_DETAILS, UPDATE_IS_NEW_USER_STATUS } from '../action/mainAction';

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
        }
        case UPDATE_IS_NEW_USER_STATUS: {
            let updatedUserDetails = state.userDetails;
            updatedUserDetails.isNewUser = payload;
            return { ...state, userDetails: updatedUserDetails };
        }
        default: {
            return state;
        }
    }

};
