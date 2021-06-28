const express = require('express')
const userCtrl = require('../controllers/user-controller')
const auth = require('../middleware/auth')
const router = new express.Router()
const multer = require('multer')

// Set options for multer
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req,file,cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error('Please use a .png, .jpg, or ,jpeg'))
        }

        cb(undefined, true)
    }
})

router.post('/users', userCtrl.createUser)

router.post('/friends', userCtrl.loginUser)

router.post('/users/logout', auth, userCtrl.logoutUser)

router.post('/users/logoutAll', auth, userCtrl.logoutAll)

router.post('/profile/picture', auth, upload.single('profilePicture'), userCtrl.editUserProfilePicture)

router.get('/profile', auth, userCtrl.readUser)

router.post('/profile/edit', auth, userCtrl.editUser)

router.delete('/profile', auth, userCtrl.deleteUser)

module.exports = router
