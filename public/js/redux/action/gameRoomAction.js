'use strict';

export const UPDATE_LIVE_USERS = 'UPDATE_LIVE_USERS';
export const USER_CONNECTED = 'USER_CONNECTED';
export const UPDATE_PENDING_GAME_ROOM_REQUESTS = 'UPDATE_PENDING_GAME_ROOM_REQUESTS';

export const updateLiveUsers = user => ({
    type: UPDATE_LIVE_USERS,
    payload: { user }
});

export const userConnected = status => ({
    type: USER_CONNECTED,
    payload: { status }
});

export const updatePendingGameRoomRequests = requests => ({
    type: UPDATE_PENDING_GAME_ROOM_REQUESTS,
    payload: { requests }
});
