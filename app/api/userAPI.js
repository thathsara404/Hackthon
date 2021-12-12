'use strict';

const User = require('../data/schema/userSchema');
const { getUserById } = require('../util/userUtil');

module.exports = {
    createUser: async (req, res) => {
        try {
            if (req.body) {
                await createUser(req.body).then(function (user) {
                    res.send(user);
                });
            } else {
                res.sendStatus(400);
            }
        } catch (error) {
            throw new Error(error);
        }
    },
    getUser: async (req, res) => {
        try {
            if (req.body) {
                await User.find().then(function (user) {
                    res.send(user);
                });
            } else {
                res.sendStatus(400);
            }
        } catch (error) {
            throw new Error(error);
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const data = await getUserById(req);
            res.json(data);
        } catch (error) {
            console.error('Error occurred while retrieving game session by id: ', error);
        }
    }
};
