'use strict';

const express = require('express');
const router = express.Router();
const { getHelloMessage, registerStudent } = require('../api/smartContractAPI');
const loginMiddleware = require('../middleware/loginValidateMiddleware');
const { getUserById } = require('../util/userUtil');

// This is a test method
router.get('/getMessage', async (req, res) => {
    const result = await getHelloMessage();
    console.log('result', result);
    res.send(result);
});

router.post('/registerInBlockchain', loginMiddleware.validateLogin, async (req, res) => {
    const user = await getUserById(req.session.details.userId);
    const result = await registerStudent(user.userId, req.body.nic, user.firstName, user.lastName);
    console.log('===>>>> ', result);

});

module.exports = router;
