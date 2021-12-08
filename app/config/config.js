'use strict';

const config = {
    APP: 'Learn-To-Earn',
    APP_PORT: {
        DEV: 1223,
        PROD: 8080
    },
    ROUTE_PATH: '/api',
    DB: {
        CONNECTION_STRING: 'mongodb+srv://'.concat(process.env.MONGODB_USERNAME || 'weladmin')
            .concat(':').concat(process.env.MONGODB_PASSWORD || 'Wel1234')
            .concat('@').concat(process.env.MONGO_DB_LIST || 'cluster0.kcyoy.mongodb.net')
            .concat('/').concat(process.env.mongo_dbname || 'wiley_gaming_profile')
            // .concat((process.env.ssl) ? '?ssl='.concat(process.env.ssl) : '')
            // .concat((process.env.MONGO_REPLICA_SET) ? '&replicaSet='.concat(process.env.MONGO_REPLICA_SET) : '')
            // .concat((process.env.authSource) ? '&authSource='.concat(process.env.authSource) : '')
            .concat('?retryWrites=').concat(process.env.retryWrites || 'true')
            .concat('&w=').concat(process.env.w || 'majority')
    },
    REDIS: {
        PORT: process.env.PORT || 6379,
        HOST: process.env.HOST || '127.0.0.1',
        FAMILY: process.env.FAMILY || 4,
        PASSWORD: process.env.PASSWORD || '',
        DB: process.env.DB || 1
    },
    SESSION: {
        COLLECTION_NAME: 'userSessions',
        SECRET: process.env.SESSION_SECRET || 'KmJHHcaapqzaMxUF5nfp',
        // 10 min session timeout
        MAX_AGE: process.env.SESSION_MAXAGE || 600000,
        SAME_SITE: process.env.SESSION_SAME_SITE || false,
        SAVE_UNINITIALIZED: process.env.SESSION_SAVE_UNINITIALIZED || false,
        RESAVE: process.env.SESSION_RESAVE || false,
        // With every backend request, session timeout will be updated
        ROLLING: process.env.ROLLING || true
    },
    QUESTION_SETTINGS: {
        NUM_OF_QUESTIONS_PER_GAME: process.env.NUM_OF_QUESTIONS_PER_GAME || 10,
        QUESTION_TIMEOUT: process.env.QUESTION_TIMEOUT || 3000,
        TIME_OUT_VALUE_END_GAME_MESSAGE: process.env.TIME_OUT_VALUE_END_GAME_MESSAGE || 3000,
        // Should be lesser than 1 second to the TIME_OUT_VALUE_START_GAME_UI_MESSAGE
        TIME_OUT_VALUE_START_GAME_MESSAGE: process.env.TIME_OUT_VALUE_START_GAME_MESSAGE || 4000,
        TIME_OUT_VALUE_START_GAME_UI_MESSAGE: process.env.TIME_OUT_VALUE_START_GAME_UI_MESSAGE || 3000
    },
    DEFAULT_SOCKET_ROOM: process.env.DEFAULT_SOCKET_ROOM || 'gameSpace'
};

module.exports = config;
