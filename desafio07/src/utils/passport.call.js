import passport from 'passport'

const passportCall = strategy => {
    return async (req, res, next) => {
        passport.authenticate(strategy, (err, user, info) => {
            if (err) return next(err)
            if (!user) return res.status(401).send({
                error: true,
                msg: info.messages ? info.messages: info.toString()
            })
            req.user = user
            next()
        })(req, res, next)
    }
}

export default passportCall