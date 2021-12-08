'use strict';

const express = require('express');
const authMiddleware = require('../middleware/authValidateMiddleware');
const { getGameSessionById } = require('../api/gameSessionAPI');

const router = express.Router();

router.route('/gameSessions/:sessionId')
    .get(authMiddleware.validateAuth, getGameSessionById);

module.exports = router;