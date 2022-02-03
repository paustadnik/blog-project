const session = require('express-session')

function isLoggedIn(req, res, next) {
    if (!req.session.currentUser) {
        res.redirect('/users/login')
    } else {
        next()
    }
}

module.exports = isLoggedIn