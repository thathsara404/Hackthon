const GameSessionModel = require('../data/schema/gameSessionSchema');

module.exports = {

    getSessionById: async (sessionId) => {
        const session = await GameSessionModel.findOne({ gameSessionId: sessionId }).exec();
        return session;
    }

};
