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
        if (response.error) {
            return {error: true, msg: response.msg}
        }
        return res.json({ error: false, msg: "Mensaje enviado correctamente" })
    }
    catch(e) {
        return res.status(500).json({error: true, msg: e.message})
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
        if (!data) return res.redirect('/recover-password?expired=true') 
        return res.status(200).render('recover-pass', { email })
    }
    catch(e) { 
        return res.status(400).send({error: true, msg: e.message})
    }
}

export const POSTRecoverPass = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userServices.getUserByEmail(email)

        if (!user) return res.status(401).json({error: true, msg: "Email does not exist"})

        const response = await userServices.updateUserById(user._id, {password})

        if (response.error) return res.status(200).json({error: true, msg: response.msg})

        return res.status(200).json({success: true})
    }
    catch(e) {
        return res.status(401).json({error: true, msg: e.message})
    }
}

