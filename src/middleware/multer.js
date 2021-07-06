const multer = require('multer')


const uploadPicture = (fileName) => {
    return function(req, res, next) {
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
        }).single(fileName)
    
        upload(req,res,(err) => {
            if (err instanceof multer.MulterError || err.message) {
                return res.status(400).send({error: err.message})
            }
            if (err) {
                return res.status(400).send({error: "Something went wrong..."})
            }
           
            next()
        })
    }    
}

module.exports = uploadPicture

