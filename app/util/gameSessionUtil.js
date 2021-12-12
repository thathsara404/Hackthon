const GameSessionModel = require('../data/schema/gameSessionSchema');

module.exports = {

    getSessionById: async (userId) => {
        const session = await GameSessionModel.find({ userStats: {  $elemMatch: {userId: userId}} }).sort({ _id: -1 }).limit(1).exec();
        return session;
    },

    createSession: async (session) => {
        const gameSession = new GameSessionModel(session);
        const createdSession = await gameSession.save();
        return createdSession;
    }

};
