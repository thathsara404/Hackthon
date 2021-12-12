'use strict';

import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import MainSearch from '../jsx/mainSearch.jsx';
import { store } from './redux/store.js';

(function () {
    render(
        <Provider store={store}>
            <MainSearch/>
        </Provider>, document.getElementById('app'));
}());
