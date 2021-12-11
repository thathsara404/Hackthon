'use strict';

const express = require('express');
const config = require('./app/config/config');
const app = express();

const AppError = require('./app/type/error/AppError');
const errorInfo = require('./app/const/errorInfo');
const connectToMongoDB = require('./app/data/connector/dbConnector');
const { session, store } = require('./app/data/connector/sessionConnector');

// Connect to the database
connectToMongoDB();

// Configure Session
app.use(session({
    secret: config.SESSION.SECRET,
    resave: config.SESSION.RESAVE,
    saveUninitialized: config.SESSION.SAVE_UNINITIALIZED,
    rolling: config.SESSION.ROLLING,
    cookie: {
        maxAge: config.SESSION.MAX_AGE,
        sameSite: config.SESSION.SAME_SITE
    },
    store
}));

// Parses incoming requests with JSON payloads (body-parser)
app.use(express.json());
// Parses incoming requests with HTML Form (body-parser) 
app.use(express.urlencoded({ extended: true }));
// Routes
app.use(config.ROUTE_PATH, require('./app/route/healthRoute'));
app.use(config.ROUTE_PATH, require('./app/route/loginRoute'));
app.use(config.ROUTE_PATH, require('./app/route/gameSessionRoute'));
app.use(config.ROUTE_PATH, require('./app/route/smartContractRoute'));

// Handle application errors
app.use(function (err, req, res, next) {
    // TODO: handle errors
    if (err) {
        console.error('App Level Error: ', err);
        res.end(err);
    }
    next();
});

// Handle unmatched route paths (API Calls)
app.use(config.ROUTE_PATH, (req, res) => {
    res.json(new AppError(errorInfo.RESOURCE_NOT_FOUND_CODE, errorInfo.RESOURCE_NOT_FOUND_MESSAGE, ''));
}); 

module.exports = app;

