import jwt from 'jsonwebtoken'
import env from '../config/env.config.js'

export const SECRET = env.JWT_SECRET

export const generateToken = object => jwt.sign(object, SECRET, {expiresIn: '1h'})

export const JWTCookie = (req, res, next) => {
    const token = req.cookies.accessToken
    if (!token) return res.send({msg: 'Authorization denied'})

    try {
        const user = jwt.verify(token, SECRET)
        req.user = user.user
        next()
    }
    catch(e) {
        return res.status(403).send({msg: 'Authorization denied'})
    }
}

export const verifyRecoverPasswordToken = token => {
    try {
        const verify = jwt.verify(token, SECRET)
        return true
    }
    catch {
        return false
    }
}