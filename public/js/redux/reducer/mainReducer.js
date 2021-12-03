import { UPDATE_LOGIN_STATUS } from '../action/mainAction';

const initialState = {
    isLoggedIn: false
};

export const main = (state = initialState, action) => {

    const { type, payload } = action;
    switch (type) {
        case UPDATE_LOGIN_STATUS: {
            const loginStatus = payload.loginStatus;
            return { ...state, isLoggedIn: loginStatus };
        } default: {
            return state;
        }
    }

};
