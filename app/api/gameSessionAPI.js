const { getSesssionById } = require('../util/gameSessionUtil');

module.exports = {

    getGameSessionById: async (req, res, next) => {
        try {
            const data = await getSesssionById(req.params.sessionId);
            res.json(data);
        } catch (error) {
            console.error('Error occurred while retrieving game session by id: ', error);
            next(error);
        }
    }
    
};