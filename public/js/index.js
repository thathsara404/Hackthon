import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { configureStore } from './redux/store.js';
import App from '../jsx/mainRouter';

(function () {
    render(
        <Provider store={configureStore()}>
                <App />
        </Provider>, document.getElementById('app'));
}());
