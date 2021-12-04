'use strict';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { main } from './reducer/mainReducer';
import { gameRoom } from './reducer/gameRoomReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const reducers = {
    // Current user status
    main,
    // Game Room status
    gameRoom
};

const rootReducer = combineReducers(reducers);

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
