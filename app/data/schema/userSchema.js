'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'firstName is a required field']
    },
    lastName: {
        type: String,
        required: [true, 'lastName is a required field']
    },
    userId: {
        type: String,
        required: [true, 'userId is a required field']
    },
    username: {
        type: String,
        required: [true, 'username is a required field']
    },
    courseID: {
        type: String,
        required: [true, 'courseID is a required field']
    },
    courseName: {
        type: String,
        required: [true, 'courseName is a required field']
    },
    isCourseCompleted: {
        type: String,
        required: [false, 'isCourseCompleted is a required field']
    },
    userGamePlayCount: {
        type: String,
        required: [false, 'userGamePlayCount is a required field'],
        default: 0
    }
});

const GameSession = mongoose.model('user', userSchema);

module.exports = GameSession;
