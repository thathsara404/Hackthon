'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const authMiddleware = require('../middleware/authValidateMiddleware');
const loginMiddleware = require('../middleware/loginValidateMiddleware');

router.get('/validateLogin', loginMiddleware.validateLogin, async (req, res) => {
    res.send({ 'isAuthonticated': true });
});

// TODO: make this method POST
router.get('/login', authMiddleware.validateAuth, (req, res) => {
    res.sendFile('main.html', { root: path.dirname(require.main.filename) + '/dist/' });
});

module.exports = router;
