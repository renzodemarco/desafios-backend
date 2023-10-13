import passport from 'passport'

const passportCall = strategy => {
    return async (req, res, next) => {
        passport.authenticate(strategy, (error, user, info) => {
            if (error) return next(error)
            if (!user) return next()
            req.user = user
            next()
        })(req, res, next)
    }
}

export default passportCall