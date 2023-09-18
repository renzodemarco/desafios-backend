import * as userServices from '../services/user.services.js'

export const GETUsers = async (req, res) => {
    try {
        return await userServices.getUsers()
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}

export const GETUserByEmail = async (req, res) => {
    try{ 
        const {email} = req.body
        return await userServices.getUserByEmail(email)
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}

export const GETUserById = async (req, res) => {
    try {
        const {id} = req.body
        return await userServices.getUserById(id)
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}

export const POSTUser = async (req, res) => {
    try {
        const {first_name, last_name, email, age, password} = req.body
        return await userServices.createUser({first_name, last_name, email, age, password})
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}

export const POSTUserValidation = async (req, res) => {
    try{
        const {email, password} = req.body
        return await userServices.validateUser(email, password)
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}