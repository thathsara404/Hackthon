const Error = require('./Error');
const errorType = require('../../const/errorType');

class AppError extends Error {
    constructor (status, message, stack) {
        super(errorType.API_NOT_FOUND, status, message, stack);
    }
}

module.exports = AppError;
