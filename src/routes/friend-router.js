const express = require('express')
const friendCtrl = require('../controllers/friend-controller')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/new-friend', auth, friendCtrl.createFriend)

router.get('/friends', auth, friendCtrl.readFriends)

router.get('/friends/:id', auth, friendCtrl.readOneFriend)

router.post('/friends/:id/new-note', auth, friendCtrl.addNote)

router.patch('/user/friends/:id', auth, friendCtrl.editFriend)

router.delete('/user/friends/:id', auth, friendCtrl.deleteFriend)

module.exports = router