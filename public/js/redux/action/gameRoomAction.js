'use strict';

export const UPDATE_LIVE_USERS = 'UPDATE_LIVE_USERS';
export const UPDATE_LIVE_USERS_INFO = 'UPDATE_LIVE_USERS_INFO';
export const USER_CONNECTED = 'USER_CONNECTED';
export const UPDATE_PENDING_GAME_ROOM_REQUESTS = 'UPDATE_PENDING_GAME_ROOM_REQUESTS';
export const UPDATE_PENDING_GAME_ROOM_REQUESTS_INFO = 'UPDATE_PENDING_GAME_ROOM_REQUESTS_INFO';

export const updateLiveUsers = users => ({
    type: UPDATE_LIVE_USERS,
    payload: { users }
});

export const updateLiveUsersInfo = usersInfo => ({
    type: UPDATE_LIVE_USERS_INFO,
    payload: { usersInfo }
});

export const userConnected = status => ({
    type: USER_CONNECTED,
    payload: { status }
});

export const updatePendingGameRoomRequests = requests => ({
    type: UPDATE_PENDING_GAME_ROOM_REQUESTS,
    payload: { requests }
});

export const updatePendingGameRoomRequestsInfo = requests => ({
    type: UPDATE_PENDING_GAME_ROOM_REQUESTS_INFO,
    payload: { requests }
});
