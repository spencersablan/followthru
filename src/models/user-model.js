const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Friend = require('./friend-model')

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

// Create user/friend relationship
userSchema.virtual('friends', {
    ref: 'Friend',
    localField: '_id',
    foreignField: 'associatedUser'
})

userSchema.methods.generateAuthToken = async function() {
    const user = this

    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) throw new Error('No user with that email')

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) throw new Error('Invalid crendentials')    
    
    return user
}

// Hash plain text password before saving
userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Delete user's friends when user is removed
userSchema.pre('remove', async function(next) {
    const user = this

    await Friend.deleteMany({ associatedUser: user._id})

})

const User = mongoose.model('User', userSchema)

module.exports = User