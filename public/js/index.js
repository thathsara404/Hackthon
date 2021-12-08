'use strict';

import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store.js';
import App from '../jsx/main';

(function () {
    render(
        <Provider store={store}>
            <App />
        </Provider>, document.getElementById('app'));
}());
