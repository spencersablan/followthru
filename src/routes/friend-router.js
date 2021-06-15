const express = require('express')
const friendCtrl = require('../controllers/friend-controller')
const router = new express.Router()

router.post('/user/newFriend', friendCtrl.createFriend)

router.get('/user/friends', friendCtrl.readFriends)

router.delete('/user/friends/:id', friendCtrl.deleteFriend)

module.exports = router