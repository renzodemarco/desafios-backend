import UserModel from "../../models/user.model.js";

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