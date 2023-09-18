import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import UserModel from '../models/user.model.js';
import ENV_CONFIG from '../../config/env.config.js'


const connection = await mongoose.connect(ENV_CONFIG.MONGO_URI) 

export default class UserManager {

    constructor() {}

    async getUsers() {
        return await UserModel.find()
    }

    async getUserByEmail(email) {
        return await UserModel.findOne({email})
    }

    async getUserById(_id) {
        return await UserModel.findOne({_id})
    }

    async createUser(user) {

        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(user.password, salt)

        const newUser = await UserModel.create(user)

        return newUser
    }

    async validateUser(email, password) {

        const user = await UserModel.findOne({email})

        if (!user) return false
    
        const isEqual = await bcrypt.compare(password, user.password)

        if (!isEqual) return false 

        return user.toObject() 
    }
}
