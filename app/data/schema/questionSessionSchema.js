'use strict';

const mongoose = require('mongoose');

const gameSessionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'UserId is a required field']
    },
    gameSessionId: {
        type: String,
        required: [true, 'gameSessionId is a required field']
    },
    userSelections: {
        type: Object,
        required: [true, 'userSelections is a required field']
    },
    currentQuestionRemainingTime:{
        type: String,
        required: [true, 'currentQuestionRemainingTime is a required field']
    }
});

const GameSession = mongoose.model('gameSession', gameSessionSchema);

module.exports = GameSession;
