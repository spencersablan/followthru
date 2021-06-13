const express = require('express')
const userCtrl = require('../controllers/user-controller')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users', userCtrl.createUser)

router.post('/users/login', userCtrl.loginUser)

router.get('/users/profile', auth, (req,res) => {
    res.send(req.user)
})

router.patch('/users/profile', auth, userCtrl.editUser)


module.exports = router