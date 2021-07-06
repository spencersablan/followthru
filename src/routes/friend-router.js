const express = require('express')
const friendCtrl = require('../controllers/friend-controller')
const auth = require('../middleware/auth')
const router = new express.Router()
const upload = require('../middleware/multer')

router.post('/new-friend', auth, friendCtrl.createFriend)

router.post('/friends/:id/picture', auth, upload('picture'), friendCtrl.editFriendPicture)

router.post('/friends/:id/new-date', auth, friendCtrl.addDate)

router.get('/friends', auth, friendCtrl.readFriends)

router.get('/friends/:id', auth, friendCtrl.readOneFriend)

router.post('/friends/:id/new-note', auth, friendCtrl.addNote)

router.patch('/user/friends/:id', auth, friendCtrl.editFriend)

router.put('/friends/:id/change-name', auth, friendCtrl.editFriendName)

router.put('/friends/:id/edit-goal', auth, friendCtrl.editGoal)

router.put('/friends/:id/edit-dates', auth, friendCtrl.editDates)

router.put('/friends/:id/edit-note', auth, friendCtrl.editNote)

router.delete('/user/friends/:id', auth, friendCtrl.deleteFriend)

router.delete('/delete-note/:id', auth, friendCtrl.deleteNote)

router.delete('/delete-date/:id',auth, friendCtrl.deleteDate)

module.exports = router