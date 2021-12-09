'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const authMiddleware = require('../middleware/authValidateMiddleware');
const gameSessionValidateMiddleware = require('../middleware/gameSessionValidateMiddleware');
const {createGameSession, getGameSession, getGameSessionById} = require('../api/gameSessionAPI');

// get session details
router.get('/gameSession', gameSessionValidateMiddleware.validateGameSession, getGameSession);

//save new Session
router.post('/gameSession', gameSessionValidateMiddleware.validateGameSession, createGameSession);

//update existing Session
router.put('/gameSession/:gameSessionId', gameSessionValidateMiddleware.validateGameSession, (req, res) => {
    res.send({ resp: 'under maintainence'});
});

//delete existing Session
router.delete('/gameSession/:gameSessionId', gameSessionValidateMiddleware.validateGameSession, (req, res) => {
    res.send({ resp: 'under maintainence'});
});

router.route('/gameSession/:sessionId')
    .get(authMiddleware.validateAuth, getGameSessionById);

module.exports = router;
