// mongoClient.js



const { MongoClient } = require('mongodb');



const url = 'mongodb://localhost:27017';

const dbName = 'TestDB';



const client = new MongoClient(url, {

});



async function connect() {

    try {

        await client.connect();

        console.log("Connected successfully to MongoDB");

        return client.db(dbName);

    } catch (err) {

        console.error("Failed to connect to MongoDB", err);

        throw err;

    }

}



module.exports = { connect };  // Exporting the connect function