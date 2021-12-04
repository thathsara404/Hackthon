'use strict';

const mongoose = require('mongoose');
const config = require('../../config/config'); 

// Mongo DB Connection
const connectToMongoDB = async () => {
    try {
        console.log('Connecting to the MongoDB...');
        await mongoose.connect(config.DB.CONNECTION_STRING, {
            useNewUrlParser: true,
            // Remove Comment autoReconnect: true,
            useUnifiedTopology: true
        });
    } catch (exception) {
        console.log('Error in Mongo DB connection, ', exception);
    } finally {
        console.log('Connected to the MongoDB.');
    }
};

module.exports = connectToMongoDB;
