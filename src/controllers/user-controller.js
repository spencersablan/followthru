const User = require('../models/user-model')

// POST: Create user
exports.createUser = async (req,res) => {
    const user = new User(req.body)
    try {
        const token = await user.generateAuthToken()
        await user.save()
        res.status(201).send({user,token})
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
        res.send({user,token})
    }
    catch (e) {
        res.status(400).send()
    }
}

// GET: Read user profile
exports.readUser = (req,res) => {
    res.send(req.user)
}

// PATCH: Edit user profile
exports.editUser = async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = [firstName, lastName, email, password]
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


