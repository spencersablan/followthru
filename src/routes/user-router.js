const express = require('express')
const userCtrl = require('../controllers/user-controller')
const auth = require('../middleware/auth')
const router = new express.Router()
const upload = require('../middleware/multer')

router.post('/users', userCtrl.createUser)

router.post('/login', userCtrl.loginUser)

router.post('/logout', auth, userCtrl.logoutUser)

router.post('/users/logoutAll', auth, userCtrl.logoutAll)

router.post('/profile/picture', auth, upload('profilePicture'), userCtrl.editUserProfilePicture)

router.post('/profile/edit', auth, userCtrl.editUser)

router.get('/profile', auth, userCtrl.readUser)

router.delete('/profile', auth, userCtrl.deleteUser)

module.exports = router
