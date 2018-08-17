/**
 * npm dependencies
 */
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Promise = require('bluebird')

/**
 * package dependencies
 */
const { User } = require('../models')
const { logger } = require('../middlewares')

/**
 * module
 */

/**
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @param {Function} next - the next middleware
 * 
 * this function verifies the token,
 * if the token could be verified then return the 
 * user object otherwise
 * return a negative result
 */
const verifyToken = async (token) => {
    //verify token
    jwt.verify(token, process.emit.JWT_SECRET, async (err, payload) => {
        //token could not be verified
        if(err){
            return new Promise.resolve({
                authenticated: false
            })
        } else {
            //token verified, fetch user
            var user
            try {
                user = await User.find({email: payload.email})
            } catch(err) {
                logger.error('Error while veryfying token.')
                logger.error(err)
                return new Promise.reject(new Error({
                    message: 'Something went wrong.'
                }))
            }
            //return the user
            return new Promise.resolve({
                authenticated: true,
                user
            })
        }
    })
}

/**
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @param {Function} next - the next middleware
 * 
 * this function signs a token from the payload
 * and returns it
 */
const createToken = (user) => {
    const email = user.email
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        algorithm: 'SHA-256',
        expiresIn: 7*24*60*60
    })
    return token
}

module.exports = {
    createToken,
    verifyToken
}
