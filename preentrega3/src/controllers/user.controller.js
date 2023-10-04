import * as userServices from '../services/user.services.js'
import { generateToken } from '../utils/jwt.js'
import userDTO from '../dto/user.dto.js'

export const GETUsers = async (req, res) => {
    try {
        const users = await userServices.getUsers()
        res.send(users)
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}

export const GETCurrentUser = async (req, res) => {
    try {
        const user = new userDTO(req.user)
        return res.send(user)
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}

export const GETUserByEmail = async (req, res) => {
    try{ 
        const {email} = req.body
        const user = await userServices.getUserByEmail(email)
        res.send(user)
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}

export const GETUserById = async (req, res) => {
    try {
        const {id} = req.body
        const user = await userServices.getUserById(id)
        res.send(user)
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}

export const POSTUser = async (req, res) => {
    try {
        const {first_name, last_name, email, age, password} = req.body
        const user = await userServices.createUser({first_name, last_name, email, age, password})
        if (!user) return res.redirect('/register?error=true')
        return res.redirect('/login')
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}

export const POSTPassportUser = async (req, res) => {
    try {
        if (req.user) res.send({error: false})
        else throw new Error('There has been an error in the register')
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}

export const POSTUserValidation = async (req, res) => {
    try {
        const { email, password } = req.body;

        let token = ''

        if (email === 'admincoder@coder.com' && password === 'adminCod3r123') {
            token = generateToken({ email: 'admincoder@coder.com', role: 'admin' })
        }

        else {
            const user = await userServices.validateUser(email, password)
            if (!user) return res.send({ error: true, msg:'Incorrect email or password' })

            token = generateToken({
                sub: user._id, 
                user: { first_name: user.first_name, last_name: user.last_name, role: user.role }
            })
        }

        res.cookie('accessToken', token, {
            maxAge: 1000 * (60*60),
            httpOnly: true
        })

        res.send({accessToken: token})
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}