import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const ChatModel = mongoose.model('messages', chatSchema)

export default ChatModel