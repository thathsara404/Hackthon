'use strict';

import { HttpUtil } from '../../httpmodule/httpUtil';
import { API_PATH } from '../../httpmodule/apiPath';

import { updateQuestionSessionSaved } from '../action/gameRoomAction';

export const saveSession = (data) => async (dispatch) => {
    HttpUtil.post(API_PATH.GAME_SESSION, data).then((result) => {
        dispatch(updateQuestionSessionSaved(true));
    }).catch((error) => {
        dispatch(updateQuestionSessionSaved(false));
        console.error('Error form game room Thunk: ', error);
    });

};
