import * as userServices from '../services/user.services.js'
import { generateToken, verifyRecoverPasswordToken } from '../utils/jwt.js'
import userDTO from '../dto/user.dto.js'
import CustomError from '../utils/error.custom.js'
import dictionary from '../utils/error.dictionary.js'

export const GETUsers = async (req, res, next) => {
    try {
        const users = await userServices.getUsers()
        return res.json(users)
    }
    catch (error) {
        return next(error)
    }
}

export const GETCurrentUser = async (req, res, next) => {
    try {
        const user = new userDTO(req.user)
        return res.json(user)
    }
    catch (error) {
        return next(error)
    }
}

export const GETUserByEmail = async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await userServices.getUserByEmail(email)
        return res.json(user)
    }
    catch (error) {
        return next(error)
    }
}

export const GETUserById = async (req, res, next) => {
    try {
        const { id } = req.body
        const user = await userServices.getUserById(id)
        return res.json(user)
    }
    catch (error) {
        return next(error)
    }
}

export const POSTUser = async (req, res, next) => {
    try {
        const { first_name, last_name, email, age, password } = req.body
        const user = await userServices.createUser({ first_name, last_name, email, age, password })
        if (user) return res.status(201).json(user)
    }
    catch (error) {
        return next(error)
    }
}

export const POSTPassportUser = async (req, res, next) => {
    try {
        if (!req.user) return CustomError.new(dictionary.registerError)
        return res.status(201).json(req.user)
    }
    catch (error) {
        return next(error)
    }
}

export const POSTUserValidation = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let token = ''

        if (email === 'admincoder@coder.com' && password === 'adminCod3r123') {
            token = generateToken({ email: 'admincoder@coder.com', role: 'admin' })
        }

        else {
            const user = await userServices.validateUser(email, password)

            if (!user) return next()

            token = generateToken({
                sub: user._id,
                user: { first_name: user.first_name, last_name: user.last_name, role: user.role }
            })
        }

        res.cookie('accessToken', token, {
            maxAge: 1000 * (60 * 60 * 24),
            httpOnly: true
        })

        return res.status(200).json({ accessToken: token })
    }
    catch (error) {
        return next(error)
    }
}

export const PUTRole = async (req, res, next) => {
    try {
        const { role, _id } = req.user

        const newRole = role == 'premium' ? 'user' : 'premium'

        const user = await userServices.updateUserById(_id, { role: newRole })

        if (!user) throw new Error('Could not update user')

        return res.status(200).json({ success: true, role: user.role })
    }
    catch (error) {
        return next(error)
    }
}

export const POSTLogout = (req, res, next) => {
    try {
        if (!req.user) return CustomError.new(dictionary.auth)
        req.logout((err) => {
            if (err) return next(err);
            res.clearCookie('accessToken');
            return res.status(200).json({ success: true });
        })
    }
    catch (error) {
        return next(error)
    }
}

export const POSTRecoverPassRequest = async (req, res) => {
    try {
        const { email } = req.body
        const response = await userServices.postRecoverPassRequest(email)
        return res.json(response)
    }
    catch(error) {
        throw error
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

export const DELETEUser = async (req, res, next) => {
    try {
        const userId = req.user._id

        await userServices.deleteUser(userId)

        return res.status(200).json({ success: true })
    }
    catch(error) {
        return next(error)
    }
}