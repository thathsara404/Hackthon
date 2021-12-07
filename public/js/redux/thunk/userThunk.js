'use strict';

import { HttpUtil } from '../../httpmodule/httpUtil';
import { API_PATH } from '../../httpmodule/apiPath';

import { updateLoginStatus } from '../action/mainAction';

export const validateLogin = () => async (dispatch) => {

    HttpUtil.get(API_PATH.VALIDATE_LOGIN).then((result) => {
        dispatch(updateLoginStatus(result.isAuthonticated));
    }).catch((error) => {
        dispatch(updateLoginStatus(false));
        console.error('Error form User Thunk: ', error);
    });

};
