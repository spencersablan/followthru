const { DateTime } = require('luxon')
const Friend = require('../models/friend-model')
const sharp = require('sharp')

// POST: Create a new friend
exports.createFriend = async (req,res) => {
    const friend = await new Friend({
        ...req.body,
        dates:[
            {
                label: 'Birthday',
                date: req.body.birthday
            },
            {
                label: 'Last Hang',
                date: req.body.lastHang
            },
            {
                label: 'Next Hang',
                date: req.body.nextHang
            }
        ],
        associatedUser: req.user._id
    })

    try {
        await friend.save()
        res.status(201).redirect('/')
    }
    catch (e) {
        res.status(400).send(e.message)
    }
}

// POST: Friend picture
exports.editFriendPicture = async (req,res) => {
    const buffer = await sharp(req.file.buffer).resize({width: 50}).png().toBuffer()
    const _id = req.params.id

    try {
        const friend = await Friend.findOne({_id, associatedUser: req.user})
        friend.picture = buffer
        await friend.save()
        res.status(200).redirect(`/friends/${_id}`)
    }
    catch (e) {
        console.log(e.message)
        res.status(400).send()
    }
    
}

// GET: Read all friends 
exports.readFriends = async (req,res) => {
    try {
        const friends = await Friend.find({associatedUser: req.user._id})

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

        res.render('friend-template', {
            friend,
            title: friend.name
        })
    }
    catch (e) {
        console.log(e)
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

exports.editFriendName = async (req,res) => {
    const _id = req.body.friendId
    const updatedName = req.body.updatedName

    try {
        const friend = await Friend.findOne({_id, associatedUser: req.user})
        friend.name = updatedName
        await friend.save()
        res.status(200).send({result: 'redirect', url: `/friends/${_id}`})
    }
    catch (e) {
        console.log(e.message)
        res.status(400).send({error: error})
    }
}

exports.editGoal = async (req,res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    
    try {
        const friend = await Friend.findOne({_id, associatedUser: req.user})
        updates.forEach((update) => friend[update] = req.body[update])
        await friend.save()
        res.status(200).send({result: 'redirect', url: `/friends/${_id}`})
    }
    catch (e) {
        console.log(e.message)
        res.status(400).send()
    }
}

exports.editDates = async (req,res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)

    try {
        const friend = await Friend.findOne({_id, associatedUser: req.user})
        updates.forEach((update) => friend[update] = req.body[update])
        await friend.save()
    }
    catch (e) {
        res.status(400).send()
    }
 }

exports.addNote = async (req,res) => {
    const _id = req.params.id
    const noteAdded = {title: req.body.title, body: req.body.body}
    const friend = await Friend.findOne({_id, associatedUser: req.user._id})
    
    try {
        friend.notes = friend.notes.concat(noteAdded)
        await friend.save()
        res.status(201).redirect(`/friends/${_id}`)
    }
    catch (e) {
        console.log(e.message)
        res.status(400).send()
    }
}

exports.addDate = async (req,res) => {
    const _id = req.params.id
    const dateAdded = {
        label: req.body.label,
        date: req.body.date
    }

    console.log(dateAdded)

    const friend = await Friend.findOne({_id, associatedUser: req.user._id})

    try {
        friend.dates = friend.dates.concat(dateAdded)
        await friend.save()
        res.status(201).redirect(`/friends/${_id}`)
    }
    catch (e) {
        console.log(e.message)
        res.status(400).send()
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

exports.deleteNote = async (req,res) => {
    const noteId = req.params.id
    const friendId = req.body.friendId

    try {
        await Friend.findOneAndUpdate(
            {_id: friendId},
            {$pull: {notes: {_id: noteId}}}
        )
        
        res.send({success: true})
    }
    catch (e) {
        console.log(e.message)
        res.status(400).send({error: e.message})
    }
}

exports.deleteDate = async (req,res) => {
    const dateId = req.params.id
    const friendId = req.body.friendId

    try {
        await Friend.findOneAndUpdate(
            {_id: friendId},
            {$pull: {dates: {_id: dateId}}}
        )
        
        res.send({success: true})
    }
    catch (e) {
        console.log(e.message)
        res.status(400).send({error: e.message})
    }
}