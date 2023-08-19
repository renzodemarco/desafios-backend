import mongoose from 'mongoose';
import crypto from 'crypto'
import UserModel from '../models/user.model.js';

const connection = await mongoose.connect('mongodb+srv://renzodemarco:coderhouse@rencluster.iuxqmho.mongodb.net/ecommerce?retryWrites=true&w=majority') 

export default class UserManager {

    constructor() {}

    async getUsers() {
        try {
            const users = await UserModel.find().lean()
            return users
        }
        catch(e) {
            return []
        }
    }

    async crearUser(user) {
        try {
            if (!user.name || !user.surname || !user.email || !user.username || !user.password) throw new Error('Incomplete info')

            if (user.email === 'admincoder@coder.com' && user.password === 'adminCod3r123') user.role = 'admin'

            user.salt = crypto.randomBytes(128).toString('base64')

            user.password = crypto.createHmac('sha256', user.salt).update(user.password).digest('hex')
    
            const newUser = await UserModel.create(user)
    
            return newUser
        }
        catch(e) {
            return {error: true, msg: e}
        }
    }

    async validarUser(username, password) {
        try {
            const user = await UserModel.findOne({username})

            if (!user) {
                return false
            }
            else {
                const loginHash = crypto.createHmac('sha256', user.salt).update(password).digest('hex')
    
                return loginHash === user.password ? user.toObject() : false
            }
        }
        catch(e) {
            return {error: true, msg: e}
        }
    }
}