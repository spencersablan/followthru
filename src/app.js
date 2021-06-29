const path = require('path')
const express = require('express')
require('./db/mongoose')
const hbs = require('hbs')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user-router')
const friendRouter = require('./routes/friend-router')
const mainRouter = require('./routes/main-router')
const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine & views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
hbs.registerHelper("pluralize", (freqNum) => {
    if (freqNum > 1) return "s"
})
hbs.registerHelper("profilePic", (pic) => {
    if (!pic) return "img/default-smiley.jpg"

    pic = pic.toString('base64')
    return `data:image/gif;base64,${pic}`
})

hbs.registerHelper("friendPic", (pic) => {
    if (!pic) return "/img/default-smiley-2.png"

    pic = pic.toString('base64')
    return `data:image/gif;base64,${pic}`
})

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(mainRouter)
app.use(userRouter)
app.use(friendRouter)


module.exports = app


// TODO: Once we build a frontend, build out scheduling with agenda for user.
