'use strict';

export const UPDATE_LIVE_USERS = 'UPDATE_LIVE_USERS';
export const UPDATE_LIVE_USERS_INFO = 'UPDATE_LIVE_USERS_INFO';
export const USER_CONNECTED = 'USER_CONNECTED';
export const UPDATE_PENDING_GAME_ROOM_REQUESTS = 'UPDATE_PENDING_GAME_ROOM_REQUESTS';
export const UPDATE_PENDING_GAME_ROOM_REQUESTS_INFO = 'UPDATE_PENDING_GAME_ROOM_REQUESTS_INFO';
export const UPDATE_USER_STATUS_IN_SUB_ROOM = 'UPDATE_USER_IN_SUB_ROOM'; 
export const UPDATE_NEW_GAME_STARTED_STATUS = 'UPDATE_NEW_GAME_STARTED_STATUS';
export const UPDATE_CURRENT_SUBROOM_ID = 'UPDATE_CURRENT_SUBROOM_ID';

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

export const updateUserInSubRoomStatus = isJoinedSubRoom => ({
    type: UPDATE_USER_STATUS_IN_SUB_ROOM,
    payload: { isJoinedSubRoom }
});

export const updateNewGameStartedStatus = isGameStarted => ({
    type: UPDATE_USER_STATUS_IN_SUB_ROOM,
    payload: { isGameStarted }
});

export const updateCurrentSubRoomId = subRoomId => ({
    type: UPDATE_CURRENT_SUBROOM_ID,
    payload: { subRoomId }
});
