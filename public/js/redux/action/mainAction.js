'use strict';

export const UPDATE_LOGIN_STATUS = 'UPDATE_LOGIN_STATUS';

export const updateLoginStatus = loginStatus => ({
    type: UPDATE_LOGIN_STATUS,
    payload: { loginStatus }
});
