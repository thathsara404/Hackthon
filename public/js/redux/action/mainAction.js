'use strict';

export const UPDATE_LOGIN_STATUS = 'UPDATE_LOGIN_STATUS';
export const UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS';

export const updateLoginStatus = loginStatus => ({
    type: UPDATE_LOGIN_STATUS,
    payload: { loginStatus }
});

export const updateUserDetails = userDetails => ({
    type: UPDATE_USER_DETAILS,
    payload: { userDetails }
});
