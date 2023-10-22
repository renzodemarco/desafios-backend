import * as recoverPasswordServices from '../services/recover.password.services.js'
import * as userServices from '../services/user.services.js'
import jwt from 'jsonwebtoken'
import env from '../config/env.config.js'

export const GETRecoverPassRequest = (req, res) => {
    const { expired } = req.query
    res.render('recover-pass-request', {expired})
}

export const POSTRecoverPassRequest = async (req, res) => {
    try {
        const { email } = req.body
        const response = await recoverPasswordServices.postRecoverPassRequest(email)
        return res.render('check-mail', {email})
    }
    catch(e) {
        return res.status(500).send({error: true, msg: e.message})
    }
}

export const GETCheckMail = (req, res) => {
    const { email } = req.query
    res.render('check-mail', {email})
}

export const GETRecoverPass = (req, res) => {
    try {
        const { token } = req.query
        const data = jwt.verify(token, env.JWT_SECRET)
        const { email } = data
        return res.status(200).render('recover-pass', { email })
    }
    catch(e) {
        return res.status(401).send({error: true, msg: e.message})
    }
}

export const POSTRecoverPass = async (req, res) => {
    try {
        const { email, password } = req.body

        const updatedPassword = userServices.updateUserByEmail(email, { password })

        return res.status(200).render('recover-pass', { email })
    }
    catch(e) {
        return res.status(401).send({error: true, msg: e.message})
    }
}

