import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import UserModel from '../models/user.model.js';

const connection = await mongoose.connect('mongodb+srv://renzodemarco:coderhouse@rencluster.iuxqmho.mongodb.net/ecommerce?retryWrites=true&w=majority') 

export default class UserManager {

    constructor() {}

    async getUsers() {
        const users = await UserModel.find().lean()
        return users
    }

    async getUserById(_id) {
        const user = await UserModel.findOne({_id})
        return user
    }

    async getUserByUsername(username) {
        const user = await UserModel.findOne({username})
        return user
    }

    async crearUser(user) {

        if (user.email === 'admincoder@coder.com' && user.password === 'adminCod3r123') user.role = 'admin'

        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(user.password, salt)

        const newUser = await UserModel.create(user)

        return newUser
    }

    async validarUser(username, password) {
        const user = await UserModel.findOne({username})

        if (!user) throw new Error('Username does not exist')
    
        const isEqual = await bcrypt.compare(password, user.password)

        if (isEqual) return user.toObject() 

        else throw new Error('Incorrect username or password')
    }
}