import CustomError from "../utils/error.custom.js"
import dictionary from "../utils/error.dictionary.js"
import { generateToken, verifyRecoverPasswordToken } from "../utils/jwt.js"

export const GETIndexView = (req, res) => {
    if (req.user && req.user.role) {
        const name = `${req.user.first_name} ${req.user.last_name}`
        return res.render('index-logged', { name })
    }
    else {
        return res.render('index', { notLogged: true })
    }
}

export const GETLoginView = (req, res) => {
    const { register, updated, login } = req.query
    res.render('login', { register, updated, login })
}

export const GETRegisterView = (req, res) => {
    const {error} = req.query
    res.render('register', {error})
}

export const GETSignoutView = (req, res) => {
    res.render('signout')
}

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
    
        return res.redirect('/')
    }
    catch(error) {
        return next(error)
    }
}

export const GETRecoverPassRequest = (req, res) => {
    const { expired } = req.query
    res.render('recover-pass-request', {expired})
}

export const GETRecoverPass = (req, res, next) => {
    try {
        const { token } = req.query

        const data = verifyRecoverPasswordToken(token)

        if (!data) return CustomError.new(dictionary.auth)

        const { email } = data

        return data.expired ? res.status(200).render('recover-pass-request', { expired: true }) : res.status(200).render('recover-pass', { email })
    }
    catch(error) {
        return next(error)
    }
}