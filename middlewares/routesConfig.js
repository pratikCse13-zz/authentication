/**
 * npm dependencies
 */
const bodyParser = require('body-parser')

/**
 * module
 */
module.exports = router => {
    //configure bodyParser on express router object
    router.use(bodyParser.json())
    router.use(bodyParser.urlencoded({extended: false}))
}