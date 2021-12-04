'use strict';

export const UPDATE_LIVE_USERS = 'UPDATE_LIVE_USERS';
export const USER_CONNECTED = 'USER_CONNECTED';

export const updateLiveUsers = user => ({
    type: UPDATE_LIVE_USERS,
    payload: { user }
});

export const userConnected = status => ({
    type: USER_CONNECTED,
    payload: { status }
});
