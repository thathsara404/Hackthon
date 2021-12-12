'use strict';

const express = require('express');
const router = express.Router();
const loginValidateMiddleware = require('../middleware/loginValidateMiddleware');
const { createGameSession, getGameSession, getGameSessionById } = require('../api/gameSessionAPI');

// Get session details
router.get('/gameSession', loginValidateMiddleware.validateLogin, getGameSession);

// Save new Session
router.post('/gameSession', loginValidateMiddleware.validateLogin, createGameSession);

// Update existing Session
router.put('/gameSession/:gameSessionId', loginValidateMiddleware.validateLogin, (req, res) => {
    res.send({ resp: 'under maintainance' });
});

// Delete existing Session
router.delete('/gameSession/:gameSessionId', loginValidateMiddleware.validateLogin, (req, res) => {
    res.send({ resp: 'under maintainance' });
});

router.route('/user/:userId/lastGameSession')
    .get(loginValidateMiddleware.validateLogin, getGameSessionById);
    // .get(getGameSessionById);

module.exports = router;
