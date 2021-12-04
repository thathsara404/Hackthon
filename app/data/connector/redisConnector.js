'use strict';

const config = require('../../config/config'); 
const Redis = require('ioredis');

const connectRedis = () => {
    try {
        console.log('Connecting to the Redis...');
        return new Redis({
            port: config.REDIS.PORT,
            host: config.REDIS.HOST,
            family: config.REDIS.FAMILY,
            password: config.REDIS.PASSWORD,
            db: config.REDIS.DB
        });
    } catch (error) {
        console.log('Error in Redis connection..., ', error);
    } finally {
        console.log('Connected to the Redis.');
    }
};

const redisInstance = connectRedis();

module.exports = redisInstance;
