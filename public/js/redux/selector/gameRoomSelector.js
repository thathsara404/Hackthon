'use strict';

export const getGameRoomConnectedStatus = state => state.gameRoom?.userConnected;

export const getNewGameRequests = state => state.gameRoom?.pendingGameRequests;

export const getCurrentGameRequestJoinedUserCount = state => state.gameRoom?.pendingGameRequestsInfo[0]?.noUsers;

export const getUserJoinedStatusInSubRoom = state => state.gameRoom?.subRoomStatus;

