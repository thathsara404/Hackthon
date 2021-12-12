const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
    quid: String,
    qustion: String,
    courseid: String,
    answers: [String],
    correctAnswer: Number,
    template: String
});

module.exports = mongoose.model('question', questionSchema);
