/**
 * npm dependencies
 */
const bcrypt = require('bcryptjs')

/**
 * package dependencies
 */
const { createToken } = require('../lib').auth.jwt
const { User } = require('../models')
const { logger } = require('../middlewares')

/**
 * module
 */

/**
 * @param {Object} req - the request object
 * @param {Object} res = the response object
 * 
 * this function registers a new user
 * calls the createToken service to generate a new token
 * and sends the token in the response
 */
const register = async (req, res) => {
    let user = { ...res.user }, dupUser, token
    //check for the existence of email
    try {
        dupUser = await User.find({email: user.email})
    } catch(err) {
        logger.error('Error in checking duplicate email while registering new user')
        logger.error(err)
        return res.status(500).send({
            message: 'Something went wrong.'
        })
    }
    //if user with duplicate email exists then send repsone as bad request
    if(dupUser){
        return res.status(400).send({
            message: 'There already exists a User with this email.'
        })
    } else {
        //successful registering
        user.password = bcrypt.hashSync(user.password, 10)
        token = createToken(user)
        return res.status(200).send({
            token: token,
            message: 'Success!!'
        })
    }
}

/**
 * @param {Object} req - he request object
 * @param {Object} res - the response object
 * 
 * this function logs in a user
 * by matching the password
 * against the email
 */
const logIn = async (req, res) => {
    //extract email and password sent for login 
    let { email, password } = req.user, searchedUser
    try {
        searchedUser = await User.find({ email })
    } catch(err) {
        logger.error('Error in fetching user object from db while logging in a user')
        logger.error(err)
        return res.status(500).send({
            message: 'Something went wrong.'
        })
    }
    if(!searchedUser){
        return res.status(400).send({
            message: 'The requested email is not registered.'
        })
    } else {
        if(!bcrypt.compareSync(password, searchedUser.password)){
            return res.status(400).send({
                message: 'Password does not match.'
            })
        } else {
            token = createToken(searchedUser)
            return res.status(200).send({
                token: token,
                message: 'Success!!'
            })
        }
    }
}

module.exports = {
    register,
    login    
}