/**
 * npm dependencies
 */
const bodyParser = require('body-parser')

/**
 * module
 */
module.exports = app => {
    //configure bodyParser on express app object
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: false}))
}