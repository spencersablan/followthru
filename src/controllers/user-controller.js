const User = require('../models/user-model')
const Friend = require('../models/friend-model')

// POST: Create user
exports.createUser = async (req,res) => {
    const user = new User(req.body)
    try {
        const token = await user.generateAuthToken()
        await user.save()
        
        // Create cookie for authentication
        res.cookie('Authentication', `Bearer ${token}`)

        res.status(201).redirect('/')
    }
    catch (e) {
        res.status(400).send(e)
    }
}

// POST: Allow existing user to login
exports.loginUser = async (req,res) => {
    const givenEmail = req.body.email
    const givenPassword = req.body.password
    
    try {
        const user = await User.findByCredentials(givenEmail, givenPassword)
        const token = await user.generateAuthToken()
        
        // Create cookie for authentication
        res.cookie('Authentication', `Bearer ${token}`)

        // res.send({user,token})
        res.status(200).redirect('/')
    }
    catch (e) {
        console.log(e.message)
        res.status(400).send()
    }
}

// POST: Allow user to logout
exports.logoutUser = async (req,res) => {
   try {
        // Find the token used to login on this particular device
        // Filter all the tokens & remove the one they used to login
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.send('Successfully Logged Out')
    }
    catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
}

// POST: Allow user to logout of all devices
exports.logoutAll = async (req,res) => {
    try{
        // Set users tokens to an empty array to clear all
        req.user.tokens = []

        await req.user.save()

        res.send('Successfully logged out of all')
    }
    catch (e) {
        res.status(500).send(e)
    }
}

// GET: Read user profile
exports.readUser = (req,res) => {
    res.send(req.user)
}

// PATCH: Edit user profile
exports.editUser = async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstName', 'lastName', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send({error: 'Invalid updates'})

    try {
        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()

        res.send(req.user)
    }
    catch (e) {
        res.status(400).send(e)
    }
}

// DELETE: Delete user
exports.deleteUser = async (req,res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    }
    catch (e) {
        res.status(400).send(e)
    }
}
