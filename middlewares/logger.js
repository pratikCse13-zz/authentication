/**
 * npm dependencies
 */
const winston = require('winston')

/**
 * module
 */
var logger = winston.createLogger({
    format: winston.format.json()
})

module.exports = logger