'use strict';

const session = require('express-session');
const sessionStore = require('connect-mongodb-session')(session);
const config = require('../../config/config');

// Connect Session Store
const store = new sessionStore({
    uri: config.DB.CONNECTION_STRING,
    collection: config.SESSION.COLLECTION_NAME
});
store.on('error', function (exception) {
    console.log(exception);
    process.exit(1);
});

module.exports = { session, store };
