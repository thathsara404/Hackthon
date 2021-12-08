'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const gameSessionValidateMiddleware = require('../middleware/gameSessionValidateMiddleware');
const gameSessionAPI = require('../api/gameSessionAPI');

// get session details
router.get('/gameSession', gameSessionValidateMiddleware.validateGameSession, async (req, res) => {
    gameSessionAPI.getGameSession(req,res);
});

//save new Session
router.post('/gameSession', gameSessionValidateMiddleware.validateGameSession, async (req, res) => {
    gameSessionAPI.createGameSession(req,res);
});

//update existing Session
router.put('/gameSession/:gameSessionId', gameSessionValidateMiddleware.validateGameSession, (req, res) => {
    res.send({ resp: 'under maintainence'});
});

//delete existing Session
router.delete('/gameSession/:gameSessionId', gameSessionValidateMiddleware.validateGameSession, (req, res) => {
    res.send({ resp: 'under maintainence'});
});

module.exports = router;
