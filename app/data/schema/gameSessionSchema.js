const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSessionSchema = new Schema({
    gameSessionId: Number,
    userStats: [{
        userId: Number,
        userName: String,
        marks: Number
    }]
});

module.exports = mongoose.model('sessionStats', gameSessionSchema);