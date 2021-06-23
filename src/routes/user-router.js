const express = require('express')
const userCtrl = require('../controllers/user-controller')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users', userCtrl.createUser)

router.post('/friends', userCtrl.loginUser)

router.post('/users/logout', auth, userCtrl.logoutUser)

router.post('/users/logoutAll', auth, userCtrl.logoutAll)

router.get('/profile', auth, userCtrl.readUser)

router.patch('/users/profile', auth, userCtrl.editUser)

router.delete('/users/profile', auth, userCtrl.deleteUser)

module.exports = router
