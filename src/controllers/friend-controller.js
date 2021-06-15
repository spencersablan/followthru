const Friend = require('../models/friend-model')


// POST: Create a new friend
exports.createFriend = async (req,res) => {
    const friend = new Friend(req.body)

    try {
        await friend.scheduleHang(friend)
        await friend.save()
        res.status(201).send({friend})
    }
    catch (e) {
        res.status(400).send(e.message)
    }
}

// GET: Read all friends 
exports.readFriends = async (req,res) => {
    try {
        const friends = await Friend.find()
        res.send(friends)
    }
    catch (e) {
        res.status(404).send(e)
    }
}

// GET: Read one friend
exports.readOneFriend = async (req,res) => {
    const id = req.params.id

    try {
        const friend = await Friend.findOne({_id: id})
        res.send(friend)
    }
    catch (e) {
        res.status(404).send(e)
    }
}

// DELETE: Delete friend
exports.deleteFriend = async (req,res) => {
    const id = req.params.id
    try {
        const friend = await Friend.findOneAndDelete({_id: id})

        if (!friend) return res.status(404).send('No friend found with that id')

        res.send(friend)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
}