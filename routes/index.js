/**
 * npm dependencies
 */
const requireDirectory = require('require-directory')

/**
 * module
 */
module.exports = app => {
    //load all the routes
    var routes = requireDirectory(module)
    //register routes on the express app object
    Object.keys(routes).forEach(routeKey => {
        app.use('/'+routeKey, routes[routeKey])
    })
}
