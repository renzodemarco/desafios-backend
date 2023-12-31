import * as recoverPasswordServices from '../services/recover.password.services.js'
import * as userServices from '../services/user.services.js'
import { verifyRecoverPasswordToken } from '../utils/jwt.js'

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

export const GETRecoverPass = (req, res) => {
    try {
        const { token } = req.query

        const data = verifyRecoverPasswordToken(token)

        if (!data) return res.redirect('/recover-password/request?expired=true') 

        const { email } = data

        console.log(data)

        return res.status(200).render('recover-pass', { email })
    }
    catch(e) { 
        return res.status(400).send({error: true, msg: e.message})
    }
}

export const PUTRecoverPass = async (req, res) => {
    try {
        const { email, password } = req.body

        console.log("el mail es: " + email)

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

