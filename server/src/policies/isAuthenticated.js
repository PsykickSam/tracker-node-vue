const passport = require('passport')

module.exports = function (req, res, nxt) {
    passport.authenticate('jwt', function (err, user) {
        if (err || !user) {
            res.status(403).send({
                error: 'You have not access to this resource.'
            })
        } else {
            req.user = user
            nxt()
        }
    })(req, res, nxt)
}
