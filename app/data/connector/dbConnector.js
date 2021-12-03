'use strict';

const mongoose = require('mongoose');
const config = require('../../config/config'); 

// Mongo DB Connection
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(config.DB.CONNECTION_STRING, {
            useNewUrlParser: true,
            // Remove Comment autoReconnect: true,
            useUnifiedTopology: true
        });
        console.log('Connected to the Mongo DB.');
    } catch (exception) {
        console.log('Error in Mongo DB connection, ', exception);
    }
};

module.exports = connectToMongoDB;
