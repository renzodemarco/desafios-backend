import * as recoverPasswordServices from '../services/recover.password.services.js'
import * as userServices from '../services/user.services.js'
import { verifyRecoverPasswordToken } from '../utils/jwt.js'
import CustomError from '../utils/error.custom.js'
import dictionary from '../utils/error.dictionary.js'

export const GETRecoverPassRequest = (req, res) => {  // * ESTO ES UNA VIEW
    const { expired } = req.query
    res.render('recover-pass-request', {expired})
}

export const POSTRecoverPassRequest = async (req, res) => {
    try {
        const { email } = req.body
        const response = await recoverPasswordServices.postRecoverPassRequest(email)
        return res.json(response)
    }
    catch(error) {
        throw error
    }
}

export const GETRecoverPass = (req, res, next) => {  // * ESTO ES UNA VIEW
    try {
        const { token } = req.query

        const data = verifyRecoverPasswordToken(token)

        if (!data) return next()

        if (data.expired) return res.redirect('/recover-password/request?expired=true') 

        const { email } = data

        return res.status(200).render('recover-pass', { email })
    }
    catch(error) {
        return next(error)
    }
}

export const PUTRecoverPass = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const token = req.headers.authorization.split(' ')[1]

        const auth = verifyRecoverPasswordToken(token)

        if (auth.email !== email) return CustomError.new(dictionary.auth)

        const user = await userServices.getUserByEmail(email)

        if (!user) return CustomError.new(dictionary.email)

        const response = await userServices.updateUserById(user._id, { password })

        return res.status(200).json(response)
    }
    catch(error) {
        return next(error)
    }
}

