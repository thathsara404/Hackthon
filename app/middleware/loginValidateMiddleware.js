'use strict';

const validateLogin = async (req, res, next) => {
    try {
        console.log('inside login validator', req.body);
        if (req.session.isAuthenticated) {
            return next();
        }
        console.log('req.session', req.session);
        throw new Error(401);
    } catch (error) {
        console.log('Error - ', error);
        throw new Error(401);
    }

};

module.exports = { validateLogin };
