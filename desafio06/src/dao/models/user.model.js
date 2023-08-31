import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    avatar: {
        type: [String],
        default: []
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

const UserModel = mongoose.model('users', userSchema)

export default UserModel