const MongoClient = require('mongodb').MongoClient;
const autoIncrement = require('mongodb-autoincrement');

const mongoDbName = 'tatadb';

const getMongoUri = () => {
    const mongoClusterName = 'cluster0';
    const mongoUser = 'usertata';
    const mongoPass = 'tata-aws-1234';

    const mongoConnStr = `mongodb+srv://${mongoUser}:${mongoPass}@${mongoClusterName}.bnm2m.mongodb.net/${mongoDbName}?retryWrites=true`;
    return mongoConnStr;
}

let cachedDb = null;

module.exports.connectToDatabase = async () => {
    if (cachedDb) {
        console.log('Use existing connection');
        return Promise.resolve(cachedDb);
    }
    return MongoClient.connect(getMongoUri(), {
        native_parser: true,
        useUnifiedTopology: true,
    }).then((client) => {
        const db = client.db(mongoDbName);
        console.log("New database connection");
        cachedDb = db;
        return cachedDb;
    }).catch((error) => {
        console.log("Mongo connection error");
        console.log(error);
    });
}

module.exports.getNextSequence = (db, collectionName) => {
    return new Promise((resolve, reject) => {
        autoIncrement.getNextSequence(db, collectionName, (err, autoIndex) => {
            if (err) {
                return reject(err);
            }
            return resolve(autoIndex);
        });
    })
}
