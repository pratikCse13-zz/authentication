/**
 * npm dependencies
 */
const Schema = require('mongoose').Schema

/**
 * module dependencies
 */
const { mongoose } = require('../db')

/**
 * module
*/
var UserSchema = new Schema({
    name: String,
    email: String,
    password: String
})

module.exports = mongoose.model('User', UserSchema)