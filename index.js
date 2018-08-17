/**
 * npm dependencies
 */
const express = require('express')
const dotenv = require('dotenv')

/**
 * package dependencies
 */
const { serverConfig } = require('middlewares')

/**
 * module
 */
//make express instance
const app = express()

//setup environment variables
dotenv.config()

// setup middlewares
serverConfig(app)

// setup routes


// launch server
app.listen(3000, () => {
    console.log('server listening on 3000')
}) 