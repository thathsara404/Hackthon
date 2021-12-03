const Friends = require('../data/schema/testSchema');
const FriendType = require('../data/dto/Friend');

module.exports = {

    getFriendById: async (id) => {
        return Friends.findById(id, (err, friend) => {
            if (err) {
                return err;
            }
            const Friend = new FriendType({ firstName: friend.firstName, lastName: friend.lastName,
                email: friend.email });
            return Friend;
        });
    }

};
