'use strict';

const QuestionSession = require('../data/schema/questionSessionSchema');
const { getSesssionById } = require('../util/gameSessionUtil');

module.exports = {
    createGameSession: async (req, res) => {
        try {
            if (req.body) {
                await QuestionSession.create(req.body).then(function (gameSession) {
                    res.send(gameSession);
                });
            } else {
                res.sendStatus(400);
            }
        } catch (error) {
            throw new Error(error);
        }
    },
    getGameSession: async (req, res) => {
        try {
            if (req.body) {
                await QuestionSession.find().then(function (gameSession) {
                    res.send(gameSession);
                });
            } else {
                res.sendStatus(400);
            }
        } catch (error) {
            throw new Error(error);
        }
    },
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
