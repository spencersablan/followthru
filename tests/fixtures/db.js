const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user-model')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    firstName: "User",
    lastName: "One",
    email: "one@test.com",
    password: "testing123",
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId() 
const userTwo = {
    _id: userTwoId,
    firstName: "User",
    lastName: "Two",
    email: "two@test.com",
    password: "testing123",
    tokens: [{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET)
    }]
}

// Reset DB before each test
const setupDatabase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
}

module.exports = {
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    setupDatabase
}