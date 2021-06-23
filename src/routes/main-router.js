const express = require('express')
const auth = require('../middleware/auth')
const mainCtrl = require('../controllers/main-controller')
const router = new express.Router()

router.get('/', auth, mainCtrl.main)

router.get('/login', mainCtrl.login)

router.get('/signup', mainCtrl.signup)

router.get('/new-friend', mainCtrl.newFriend)

module.exports = router