const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate (value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type: String,
        required: true,
        minLength: 6,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    profilePicture: {
        type: Buffer
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User