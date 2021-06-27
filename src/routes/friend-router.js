const express = require('express')
const friendCtrl = require('../controllers/friend-controller')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/new-friend', auth, friendCtrl.createFriend)

router.get('/friends', auth, friendCtrl.readFriends)

router.get('/friends/:id', auth, friendCtrl.readOneFriend)

router.post('/friends/:id/new-note', auth, friendCtrl.addNote)

router.post('/friends/:id/new-date', auth, friendCtrl.addDate)

router.patch('/user/friends/:id', auth, friendCtrl.editFriend)

router.put('/friends/:id/change-name', auth, friendCtrl.editFriendName)

router.put('/friends/:id/edit-goal', auth, friendCtrl.editGoal)

router.delete('/user/friends/:id', auth, friendCtrl.deleteFriend)

router.delete('/delete-note/:id', auth, friendCtrl.deleteNote)

router.delete('/delete-date/:id',auth, friendCtrl.deleteDate)

module.exports = router