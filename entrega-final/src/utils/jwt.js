import jwt from 'jsonwebtoken'
import env from '../config/env.config.js'
import CustomError from './error.custom.js'
import dictionary from './error.dictionary.js'

export const SECRET = env.JWT_SECRET

export const generateToken = object => jwt.sign(object, SECRET, { expiresIn: '1h' })

export const JWTCookie = (req, res, next) => {
    const token = req.cookies.accessToken
    if (!token) return CustomError.new(dictionary.auth)

    try {
        const user = jwt.verify(token, SECRET)
        req.user = user.user
        next()
    }
    catch(e) {
        return CustomError.new(dictionary.forbidden)
    }
}

export const verifyRecoverPasswordToken = token => {
    try {
        const auth = jwt.verify(token, SECRET)
        return auth
    }
    catch(error) {
        if (error instanceof jwt.TokenExpiredError) return { expired: true }
        return false
    }
}