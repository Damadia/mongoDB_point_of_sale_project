const mongoose = require("mongoose");

async function connection(params) {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/parcial1");
        console.log("connected");
    }
    catch (err){
        console.log("Something wrong: " + err.message);
    }
    const db = mongoose.connection.db
    console.log(db.databaseName);
    return db;
}

module.exports = connection;


/*const mongo = require("mongodb");

//settings mongoDb

const hostMongo = new mongo.MongoClient("mongodb://127.0.0.1:27017");
const DB_NAME = "parcial1";



const connection = async () =>
{
    try{
        if (!DB_NAME)
            process.exit(1);

        await hostMongo.connect();
        const db = hostMongo.db(DB_NAME);
        const collection = db.collection("productos");
        console.log(await collection.findOne({}));
        return db;
    }
    catch (err){
        console.log(err.message);
    }
}

module.exports = {connection, hostMongo};*/