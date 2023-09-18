import jwt from 'jsonwebtoken'
import ENV_CONFIG from '../config/env.config'

export const SECRET = ENV_CONFIG.JWT_SECRET

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