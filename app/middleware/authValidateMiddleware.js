'use strict';
const HttpUtil = require('../util/httpUtil')
const configs = require('../config/config')
const axios = require('axios').default;

const validateAuth = async (req, res, next) => {

    try {
        console.log('inside login validator', req.body)
        const result = await HttpUtil.post(configs.SYSTEM_TOKEN.SYSTEM_VALIDATE_TOKEN, {systemUsername: configs.SYSTEM_TOKEN.SYSTEM_USERNAME, token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJUZXN0MTIyIiwiZXhwIjoxNjQyNzEzNjgzLCJpYXQiOjE2MzkxMTM2ODN9.edTgSHOGvyV0YJ3J4mAw0d4kWvtKQUIbnZVuiG1fOSY0ommiisTpnitZGaOTS4Jacfo3G_21j_T029m3o3x9LA'});
          console.log(result)
        if(result.data.validToken) {

            req.session.isAuthenticated = true;

            req.session.details = {
                firstName: req.body.fname,
                lastName: req.body.lname,
                userId: req.body.userId,
                username: req.body.username,
                courseID: req.body.courseId,
                courseName: req.body.courseName,
                isCourseCompleted: req.body.isCompleted
            }

        }
        console.log('req.session',req.session)
        return next();

    } catch (error) {
        console.log('Error - ', error);
    }


};

module.exports = { validateAuth };
