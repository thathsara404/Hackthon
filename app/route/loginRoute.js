'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const authMiddleware = require('../middleware/authValidateMiddleware');
const loginMiddleware = require('../middleware/loginValidateMiddleware');

router.post('/validateLogin', loginMiddleware.validateLogin, async (req, res) => {
    console.log(req.session);
    res.send({ 'isAuthenticated': req.session.isAuthenticated, 'userDetails': req.session.details });
});

router.post('/login', authMiddleware.validateAuth, async (req, res) => {
    res.sendFile('main.html', { root: path.dirname(require.main.filename) + '/dist/' });
});

router.get('/testHarness', async (req, res) => {
    res.sendFile('testharness.html', { root: path.dirname(require.main.filename) + '/dist/' });
});

router.get('/digitalcertification', async (req, res) => {
    res.sendFile('certification.html', { root: path.dirname(require.main.filename) + '/dist/' });
});

module.exports = router;
