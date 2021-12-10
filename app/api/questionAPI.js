'use strict';

const { getQuestion } = require('../util/questionUtil');

module.exports = {
    getQuestion: async (req, res) => {
        try {
            const question = await getQuestion();
            res.json(question);
        } catch (error) {
            console.error('Error in retrieving question : ', error);
        }
        
    }
};

