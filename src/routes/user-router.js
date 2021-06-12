const express = require('express')
const userCtrl = require('../controllers/user-controller')
const router = new express.Router()

router.post('/users', userCtrl.createUser)

module.exports = router