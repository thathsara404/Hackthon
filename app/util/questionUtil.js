const QuestionModel = require('../data/schema/questionSchema');

module.exports = {

    getQuestion: async () => {
        const count = await QuestionModel.count().exec();

        // Get a random entry
        const random = Math.floor(Math.random() * count);

        const question = await QuestionModel.findOne().skip(random).exec();
        return question;
    }
};
