'use strict';

const express = require('express');
const router = express.Router();
// Const gameSessionValidateMiddleware = require('../middleware/gameSessionValidateMiddleware');
const { getQuestion } = require('../api/questionAPI');

// Get question
router.get('/question', getQuestion);

module.exports = router;
