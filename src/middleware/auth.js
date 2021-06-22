const jwt = require('jsonwebtoken')
const User = require('../models/user-model')

const auth = async (req,res,next) => {
    try {
        console.log(req)
        // Get the token from the Authorization header
        const token = req.header('Authorization').replace('Bearer ', '')
        
        // Decode the token
        // We embedded the id of the user in the token (jwt.sign())
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Find the user by the id that we embedded in the token
        // tokens.token is a string because it has special characters
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        
        if (!user) throw new Error()
        
        /* Send the token, allowing us to eventually delete this particular
        token whenever the user logs out of their device. */
        req.token = token
        req.user = user

        next()
    }
    catch (e) {
        console.log(e)
        res.status(401).send({error: 'Please Authenticate'})
    } 
}

module.exports = auth