'use strict';

export const getGameRoomConnectedStatus = state => state.gameRoom?.userConnected;

export const getNewGameRequests = state => state.gameRoom?.pendingGameRequests;

export const getCurrentGameRequestJoinedUserCount = state => state.gameRoom?.pendingGameRequestsInfo[0]?.noUsers;

export const getUserJoinedStatusInSubRoom = state => state.gameRoom?.subRoomStatus;

export const getCurrentGameRoomId = state => state.gameRoom?.pendingGameRequestsInfo[0]?.gameRoomId;

export const getCurrentSubRoomId = state => state.gameRoom?.currentSubRoomId;

export const getGameStartedStatus = state => state.gameRoom?.newGameStarted;

export const getCurrentQuestion = state => state.gameRoom?.currentQuestion;

export const getCurrentQuestionId = state => state.gameRoom?.currentQuestionID;

export const getLiveUsersInfo = state => state.gameRoom?.liveUsersInfo;

export const getCurrentQuestionCount = state => state.gameRoom?.sessionQuestionCount;

export const getCurrentQuestionRemaingTime = state => state.gameRoom?.currentQuestionRemainingTime;

export const getIsLastGameFinished = state => state.gameRoom?.isLastGameFinished;

export const getPlayedGamesCounter = state => state.gameRoom?.playedGamesCounter;

