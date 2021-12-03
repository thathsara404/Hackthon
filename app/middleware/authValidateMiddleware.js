'use strict';

const validateAuth = async (req, res, next) => {

    try {
        // Auth Token Validation
        req.session.isAuthenticated = true;
        req.session.details = {
            username: 'thathsara'
        };
        return next();
    } catch (error) {
        throw new Error(error);
    }

};

module.exports = { validateAuth };
