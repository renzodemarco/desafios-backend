import { generateToken } from '../utils/jwt.js'
import * as userServices from '../services/user.services.js'

export const GETGithubCallback = (req, res, next) => {
    try {
        const user = req.user

        const token = generateToken({
            sub: user._id,
            user: { first_name: user.first_name, last_name: user.last_name, role: user.role }
        })
    
        res.cookie('accessToken', token, {
            maxAge: 1000 * (60 * 60),
            httpOnly: true
        })
    
        return res.redirect('/products')
    }
    catch(error) {
        error.from = "controller"
        return next(error)
    }
}

export const DELETEUser = async (req, res, next) => {
    try {
        const userId = req.user._id

        await userServices.deleteUser(userId)

        return res.status(200).json({ success: true })
    }
    catch(error) {
        error.from = "controller"
        return next(error)
    }
}