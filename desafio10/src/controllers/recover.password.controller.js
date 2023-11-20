import * as recoverPasswordServices from '../services/recover.password.services.js'
import * as userServices from '../services/user.services.js'
import { verifyRecoverPasswordToken } from '../utils/jwt.js'

export const GETRecoverPassRequest = (req, res) => {
    const { expired } = req.query
    res.render('recover-pass-request', {expired})
}

export const POSTRecoverPassRequest = async (req, res, next) => {
    try {
        const { email } = req.body
        const response = await recoverPasswordServices.postRecoverPassRequest(email, next)
        if (response.error) {
            return {error: true, msg: response.msg}
        }
        return res.json({ error: false, msg: "Mensaje enviado correctamente" })
    }
    catch(error) {
        error.from = 'controller'
        return next(error)
    }
}

export const GETRecoverPass = (req, res, next) => {
    try {
        const { token } = req.query

        const data = verifyRecoverPasswordToken(token)

        if (!data) return res.redirect('/recover-password/request?expired=true') 

        const { email } = data

        return res.status(200).render('recover-pass', { email })
    }
    catch(error) {
        error.from = 'controller'
        return next(error)
    }
}

export const PUTRecoverPass = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await userServices.getUserByEmail(email, next)

        if (!user) return res.status(401).json({error: true, msg: "Email does not exist"})

        const response = await userServices.updateUserById(user._id, {password}, next)

        if (response.error) return res.status(200).json({error: true, message: response.message})

        return res.status(200).json({success: true})
    }
    catch(error) {
        error.from = 'controller'
        return next(error)
    }
}

