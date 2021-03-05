const { COLLECTIONS } = require("../config/collections");
const { connectToDatabase } = require("../config/database")

module.exports.getAllUsers = async (req, res) => {
    if (req.method === 'GET') {
        const db = await connectToDatabase();
        const collection = await db.collection(COLLECTIONS.USERS);

        const users = await collection.find({}).toArray();

        return res.status(200).json(users);
    }
}
