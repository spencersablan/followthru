const User = require('../models/user-model')

exports.createUser = async (req,res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.send(user)
    }
    catch (error) {
        res.status(400).send(error)
    }
}


