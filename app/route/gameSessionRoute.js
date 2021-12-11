'use strict';

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authValidateMiddleware');
const gameSessionValidateMiddleware = require('../middleware/gameSessionValidateMiddleware');
const { createGameSession, getGameSession, getGameSessionById } = require('../api/gameSessionAPI');

// Get session details
router.get('/gameSession', gameSessionValidateMiddleware.validateGameSession, getGameSession);

// Save new Session
router.post('/gameSession', createGameSession);

// Update existing Session
router.put('/gameSession/:gameSessionId', gameSessionValidateMiddleware.validateGameSession, (req, res) => {
    res.send({ resp: 'under maintenance' });
});

// Delete existing Session
router.delete('/gameSession/:gameSessionId', gameSessionValidateMiddleware.validateGameSession, (req, res) => {
    res.send({ resp: 'under maintenance' });
});

router.route('/gameSessions/:sessionId')
    .get(authMiddleware.validateAuth, getGameSessionById);

module.exports = router;
