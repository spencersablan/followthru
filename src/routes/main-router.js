const express = require('express')
const mainCtrl = require('../controllers/main-controller')
const router = new express.Router()

router.get('/', mainCtrl.login)

router.get('/signup', mainCtrl.signup)

router.get('/users/login', mainCtrl.friends)

module.exports = router