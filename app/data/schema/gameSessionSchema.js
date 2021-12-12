const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSessionSchema = new Schema({
    gameSessionId: String,
    userStats: [{
        userId: String,
        userName: String,
        marks: Number
    }]
});

module.exports = mongoose.model('sessionStats', gameSessionSchema);
