exports.login = (req,res) => {
    res.render('index', {
        title: 'followthru'
    })
}

exports.friends =(req,res) => {
    res.render('friends')
}

exports.signup = (req,res) => {
    res.render('signup')
}

exports.newFriend = (req,res) => {
    res.render('new-friend', {
        title: 'tell us about your new friend'
    })
}