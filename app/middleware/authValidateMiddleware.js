'use strict';
const HttpUtil = require('../util/httpUtil');
const configs = require('../config/config');
const { createUser, getUserById } = require('../util/userUtil');

const validateAuth = async (req, res, next) => {

    try {
        // const result = await HttpUtil.post(configs.SYSTEM_TOKEN.SYSTEM_VALIDATE_TOKEN, { systemUsername: configs.SYSTEM_TOKEN.SYSTEM_USERNAME, token: req.body.authToken });
        // Console.log(result)
        if (true) {
            req.session.isAuthenticated = true;

            req.session.details = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userId: req.body.userId,
                username: req.body.username,
                courseID: req.body.courseID,
                courseName: req.body.courseName,
                isCourseCompleted: req.body.isCourseCompleted
            };
            // Check if user exists in Db
            const user = await getUserById(req.body.userId);
            if (user === null) {
                req.session.details.isNewUser = true;
                const userobj = await createUser(req.body);
                console.log('userobj', userobj);
            } else {
                req.session.details.isNewUser = false;
            }

        }
        return next();

    } catch (error) {
        console.log('Error - ', error);
    }

};

module.exports = { validateAuth };