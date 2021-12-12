'use strict';

export const UPDATE_LOGIN_STATUS = 'UPDATE_LOGIN_STATUS';
export const UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS';
export const UPDATE_IS_NEW_USER_STATUS = 'UPDATE_IS_NEW_USER_STATUS';

export const updateLoginStatus = loginStatus => ({
    type: UPDATE_LOGIN_STATUS,
    payload: { loginStatus }
});

export const updateUserDetails = userDetails => ({
    type: UPDATE_USER_DETAILS,
    payload: { userDetails }
});

export const updateIsNewUserStatus = status => ({
    type: UPDATE_IS_NEW_USER_STATUS,
    payload: { status }
});
