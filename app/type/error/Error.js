class Error {
    constructor (name, status, message, stack) {
        this.name = name;
        this.status = status;
        this.message = message;
        this.stack = stack;
    }
}

module.exports = Error;

