import UserModel from "../../models/user.model.js";

export default class UserManager {

    constructor() {}

    async getUsers(next) {
        try {
            return await UserModel.find()
        }
        catch(error) {
            error.from = 'dao'
            return next(error)
        }
    }

    async getUserByEmail(email, next) {
        try {
            return await UserModel.findOne({email})
        }
        catch(error) {
            error.from = 'dao'
            return next(error)
        }
    }

    async getUserById(_id, next) {
        try {
            return await UserModel.findOne({_id})
        }
        catch(error) {
            error.from = 'dao'
            return next(error)
        }
    }

    async createUser(user, next) {
        try {
            return await UserModel.create(user)
        }
        catch(error) {
            error.from = 'dao'
            return next(error)
        }
    }

    async updateUser(_id, data, next) {
        try {
            return await UserModel.findByIdAndUpdate(_id, data, { new: true })
        }
        catch(error) {
            error.from = 'dao'
            return next(error)
        }
    }
}