'use strict';

export const getUserLoginStatus = state => state.main.isLoggedIn;
export const getUserDetails = state => state.main.userDetails;
export const getUserId = state => state.main.userDetails.userId;

