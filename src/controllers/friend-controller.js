const Friend = require('../models/friend-model')
const agenda = require('../db/agenda')


// POST: Create a new friend
exports.createFriend = async (req,res) => {
    const friend = new Friend({
        ...req.body,
        associatedUser: req.user._id
    })
    // const {frequencyNum, frequencyUnit} = friend

    try {
        // await agenda.start()
        // await agenda.every("30 seconds", "test")
        await friend.save()
        res.redirect(201, '/friends')
    }
    catch (e) {
        res.status(400).send(e.message)
    }
}

// GET: Read all friends 
exports.readFriends = async (req,res) => {
    try {
        const friends = await Friend.find({associatedUser: req.user._id})
        // res.send(friends)
        res.render('friends', {
            user,
            token,
            friends,
            title: 'friends'
        })
    }
    catch (e) {
        res.status(404).send(e)
    }
}

// GET: Read one friend
exports.readOneFriend = async (req,res) => {
    const _id = req.params.id

    try {
        const friend = await Friend.findOne({_id, associatedUser: req.user._id})

        if (!friend) throw new Error({error: "No friend with that id"})
        res.send(friend)
    }
    catch (e) {
        res.status(404).send(e)
    }
}

// PATCH: Edit friend
exports.editFriend = async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'frequencyNum', 'frequencyUnit', 'lastHang', 'nextHang', 'birthday']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    const _id = req.params.id

    if (!isValidOperation) return res.status(400).send({error: "Invalid Updates!"})

    try {
        const friend = await Friend.findOne({_id, associatedUser: req.user._id})

        if (!friend) return res.status(404).send({error: "Friend does not exist!"})

        updates.forEach((update) => friend[update] = req.body[update])
        await friend.save()
        res.send(friend)
    }
    catch (e) {
        res.status(400).send(e)
    }
}

// DELETE: Delete friend
exports.deleteFriend = async (req,res) => {
    const _id = req.params.id
    try {
        const friend = await Friend.findOneAndDelete({_id, associatedUser: req.user._id})

        if (!friend) return res.status(404).send('No friend found with that id')

        res.send(friend)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
}