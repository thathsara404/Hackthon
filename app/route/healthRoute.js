'use strict';

const express = require('express');
const router = express.Router();

const routePath = require('../const/routePath');

router.get(routePath.HEALTH, async (req, res) => {
    res.json({ status: 'running' });
});

module.exports = router;
