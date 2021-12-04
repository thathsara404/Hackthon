'use strict';

export const getGameRoomConnectedStatus = state => state.gameRoom.userConnected;

export const getNewGameRequests = state => state.gameRoom.pendingGameRequests;
