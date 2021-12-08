'use strict';

const GameSession = require('../data/schema/gameSessionSchema');

const createGameSession = async (req, res) => {
    try {
        if (req.body) {
            await GameSession.create(req.body).then(function (gameSession) {
                res.send(gameSession);
            });
        } else {
            res.sendStatus(400);
        }
    } catch (error) {
        throw new Error(error);
    }
};

const getGameSession = async (req, res) => {
    try {
        if (req.body) {
            await GameSession.find().then(function (gameSession) {
                res.send(gameSession);
            });
        } else {
            res.sendStatus(400);
        }
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = { createGameSession, getGameSession };
