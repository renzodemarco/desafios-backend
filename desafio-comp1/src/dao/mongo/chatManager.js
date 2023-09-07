import mongoose from 'mongoose'
import ChatModel from '../models/chat.model.js'

const connection = await mongoose.connect('mongodb+srv://renzodemarco:coderhouse@rencluster.iuxqmho.mongodb.net/ecommerce?retryWrites=true&w=majority')

export default class ChatManager {
    
    constructor() {}

    async getHistory() {
        try {
            const data = await ChatModel.find()
            return data
        }
        catch(e) {
            return []
        }
    }

    async sendMsg(msg) {
        try {
            await ChatModel.insertMany([msg])
        }
        catch(e) {
            return e
        }
    }
}