const GameSessionModel = require('../data/schema/gameSessionSchema');

module.exports = {

    getSesssionById: async (sessionId) => {
        return await GameSessionModel.findOne({ gameSessionId: sessionId }).exec();
    }

};