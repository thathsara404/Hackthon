'use strict';

const config = {
    APP: 'Learn-To-Earn',
    ROUTE_PATH: '/api',
    DB: {
        CONNECTION_STRING: 'mongodb://'.concat(process.env.MONGODB_USERNAME || 'mongo')
            .concat(':').concat(process.env.MONGODB_PASSWORD || 'mongo')
            .concat('@').concat(process.env.MONGO_DB_LIST || 'localhost:27017')
            .concat('/').concat(process.env.mongo_dbname || 'AppDB')
            .concat((process.env.ssl) ? '?ssl='.concat(process.env.ssl) : '')
            .concat((process.env.MONGO_REPLICA_SET) ? '&replicaSet='.concat(process.env.MONGO_REPLICA_SET) : '')
            .concat((process.env.authSource) ? '&authSource='.concat(process.env.authSource) : '')
            .concat((process.env.retryWrites) ? '&retryWrites='.concat(process.env.retryWrites) : '')
            .concat((process.env.w) ? '&w='.concat(process.env.w) : '')
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
    }
};

module.exports = config;
