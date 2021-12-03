import { createStore, combineReducers, applyMiddleware } from 'redux';
import { main } from './reducer/mainReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const reducers = {
    // Current user
    main
};

const rootReducer = combineReducers(reducers);

export const configureStore = () => createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
