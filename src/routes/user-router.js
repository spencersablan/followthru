const express = require('express')
const userCtrl = require('../controllers/user-controller')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users', userCtrl.createUser)

router.post('/users/login', userCtrl.loginUser)

router.post('/users/logout', auth, userCtrl.logoutUser)

router.post('/users/logoutAll', auth, userCtrl.logoutAll)

router.get('/users/profile', auth, userCtrl.readUser)

router.patch('/users/profile', auth, userCtrl.editUser)

module.exports = router
