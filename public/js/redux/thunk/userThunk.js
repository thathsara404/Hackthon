'use strict';

import { HttpUtil } from '../../httpmodule/httpUtil';
import { API_PATH } from '../../httpmodule/apiPath';

import { updateLoginStatus, updateUserDetails } from '../action/mainAction';

export const validateLogin = () => async (dispatch) => {

    HttpUtil.post(API_PATH.VALIDATE_LOGIN).then((result) => {
        return Promise.all([dispatch(updateLoginStatus(result.isAuthenticated)),
        dispatch(updateUserDetails(result.userDetails))])
    }).catch((error) => {
        console.error('Error form User Thunk: ', error);
        return dispatch(updateLoginStatus(false));
    });
};

