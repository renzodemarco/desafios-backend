import mongoose from 'mongoose';
import UserModel from '../../models/user.model.js';
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
        return await UserModel.create(user)
    }
}