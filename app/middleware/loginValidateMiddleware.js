'use strict';

const validateLogin = async (req, res, next) => {

    try {
        if (req.session.isAuthenticated) {
            next();
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        throw new Error(error);
    }

};

module.exports = { validateLogin };
