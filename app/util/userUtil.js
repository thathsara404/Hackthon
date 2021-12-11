const User = require('../data/schema/userSchema');

module.exports = {

    getUserById: async (userId) => {
        const data = await User.findOne({ userId: userId }).exec();
        return data;
    },
    createUser: async (user) => {
        await User.create(user).then(function (user) {
            return user;
        });
    }

};
