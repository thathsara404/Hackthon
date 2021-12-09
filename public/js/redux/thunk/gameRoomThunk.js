'use strict';

import { HttpUtil } from '../../httpmodule/httpUtil';
import { API_PATH } from '../../httpmodule/apiPath';

export const getSessionById = (sessionId) => async (dispatch) => {

    return HttpUtil.get(`${API_PATH.GET_GAME_SESSION}${sessionId}`).then((result) => {
        return result;
    }).catch((error) => {
        console.error('Error occurred while retrieving last game session: ', error);
    });

};
