/**
 * package dependencies
 */
const { createToken, verifyToken } = require('../lib').auth.jwt
const logger = require('./logger')

/**
 * module
 */

/**
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @param {Function} next - the next middleware
 * 
 * this function authenticates a request
 * if the authentication is successful then it creates a new token
 * and sends it forward
 */
const authenticate = (req, res, next) => {
    //extract the token from req headers
    const token = req.headers['x-access-token'], verificationResults, newToken
    //if there is no token
    if(!token){
        return res.status(401).send({
            message: 'No authorization token found.'
        })
    } else {
        try {
            verificationResults = verifyToken(token)
        } catch(err) {
            logger.error('Error while verifying token')
            logger.error(err)
            return res.status(500).send({
                message: err.message
            })
        }
        if(!verificationResults.authenticated){
            return res.status(401).send({
                message: 'Token could not be verified.'
            })
        } else {
            newToken = createToken(verificationResults.user)
            req.user = verificationResults.user
            req.token = newToken
            next()
        }
    }
}

module.exports = {
    authenticate
}