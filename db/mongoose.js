/**
 * npm dependencies
 */
const mongoose = require('mongoose')

/**
 * package dependencies
 */
const { logger } = require('../middlewares')

/**
 * module
 */
try {
    mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@ds111012.mlab.com:11012/freekik`)
} catch (err) {
    logger.error('Connection to MongoDb failed.')
    logger.error(err)
    process.exit(0)
}

modul.exports = mongoose