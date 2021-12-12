'use strict';

export const UPDATE_LIVE_USERS = 'UPDATE_LIVE_USERS';
export const UPDATE_LIVE_USERS_INFO = 'UPDATE_LIVE_USERS_INFO';
export const USER_CONNECTED = 'USER_CONNECTED';
export const UPDATE_PENDING_GAME_ROOM_REQUESTS = 'UPDATE_PENDING_GAME_ROOM_REQUESTS';
export const UPDATE_PENDING_GAME_ROOM_REQUESTS_INFO = 'UPDATE_PENDING_GAME_ROOM_REQUESTS_INFO';
export const UPDATE_USER_STATUS_IN_SUB_ROOM = 'UPDATE_USER_IN_SUB_ROOM'; 
export const UPDATE_NEW_GAME_STARTED_STATUS = 'UPDATE_NEW_GAME_STARTED_STATUS';
export const UPDATE_CURRENT_SUBROOM_ID = 'UPDATE_CURRENT_SUBROOM_ID';
export const UPDATE_CURRENT_QUESTION = 'UPDATE_CURRENT_QUESTION';
export const UPDATE_QUESTION_COUNT = 'UPDATE_QUESTION_COUNT';
export const UPDATE_QUESTION_REMAING_TIME = 'UPDATE_QUESTION_REMAING_TIME';
export const UPDATE_QUESTION_SESSION_SAVED = 'UPDATE_QUESTION_SESSION_SAVED';
export const UPDATE_LAST_GAME_FINISHED = 'LAST_GAME_FINISHED';
export const UPDATE_PLAYED_GAMES_COUNTER = 'UPDATE_PLAYED_GAMES_COUNTER';

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
    type: UPDATE_NEW_GAME_STARTED_STATUS,
    payload: { isGameStarted }
});

export const updateCurrentSubRoomId = subRoomId => ({
    type: UPDATE_CURRENT_SUBROOM_ID,
    payload: { subRoomId }
});

export const updateCurrentQuestion = currentQuestionTemplate => ({
    type: UPDATE_CURRENT_QUESTION,
    payload: { currentQuestionTemplate }
});

export const updateQuestionCount = (number) => ({
    type: UPDATE_QUESTION_COUNT,
    payload: { number }
});

export const updateQuestionRemaingTime = (remaingTime) => ({
    type: UPDATE_QUESTION_REMAING_TIME,
    payload: { remaingTime }
});

export const updateQuestionSessionSaved = (sessinSaved) => ({
    type: UPDATE_QUESTION_SESSION_SAVED,
    payload: { sessinSaved }
});

export const updateLastGameFinished = (status) => ({
    type: UPDATE_LAST_GAME_FINISHED,
    payload: { status }
});

export const updatePlayedGamesCounter = () => ({
    type: UPDATE_PLAYED_GAMES_COUNTER
})
