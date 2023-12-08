import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: Number,
    password: {
        type: String
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'premium'],
        default: 'user'
    }
})

userSchema.pre("findOne", function() {
    this.populate("cart")
});

const UserModel = mongoose.model('users', userSchema)

export default UserModel