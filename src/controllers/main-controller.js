const Friend = require('../models/friend-model')

exports.main = async (req,res) => {
    const user = req.user
    const friends = await Friend.find({associatedUser: user._id})
    try {
        res.render('friends', {
            user,
            friends,
            title: 'friends'
        })
    }
    catch (e) {
        res.redirect('login')
    }
}

exports.login = (req,res) => {
    res.render('login', {
        title: 'followthru'
    })
}

exports.signup = (req,res) => {
    res.render('new-user')
}

exports.newFriend = (req,res) => {
    res.render('new-friend', {
        title: 'tell us about your new friend'
    })
}