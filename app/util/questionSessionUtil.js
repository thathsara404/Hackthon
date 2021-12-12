const questionSessionSchema = require('../data/schema/questionSessionSchema');

module.exports = {

    getQuestionSessionsById: async (gameSessionId) => {
        const sessions = await questionSessionSchema.aggregate([
            {
                '$match': {
                    'gameSessionId': gameSessionId
                }
            }, {
                '$lookup': {
                    'from': 'questions', 
                    'localField': 'userSelections.questionId', 
                    'foreignField': 'quid', 
                    'as': 'correctAnswer'
                }
            }, {
                '$lookup': {
                    'from': 'users', 
                    'localField': 'userId', 
                    'foreignField': 'userId', 
                    'as': 'user'
                }
            }, {
                '$unwind': {
                    'path': '$correctAnswer', 
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$unwind': {
                    'path': '$user', 
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$bucketAuto': {
                    'groupBy': '$userId', 
                    'buckets': 5, 
                    'output': {
                        'userId': { $first: '$userId' },
                        'userName': { $first: '$user.username' },
                        'documents': {
                            '$push': {
                                'correctAnswer': '$correctAnswer.correctAnswer', 
                                'gameSessionId': '$gameSessionId', 
                                'userSelections': '$userSelections'
                            }
                        }
                    }
                }
            }
        ]).exec();
        return sessions;
    }

};

