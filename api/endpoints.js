const users = require("./users");

module.exports = async (req, res) => {
    const enpoints = {
        users: {
            get: '/users',
        },
    }

    res.status(200).json(enpoints);
}
