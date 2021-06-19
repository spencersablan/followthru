const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('./db/mongoose')
const userRouter = require('./routes/user-router')
const friendRouter = require('./routes/friend-router')
const app = express()

app.use(express.json())
app.use(userRouter)
app.use(friendRouter)


// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine & views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('/', (req,res) => {
    res.render('index', {
        title: 'WORKING!'
    })
})

module.exports = app


// TODO: Once we build a frontend, build out scheduling with agenda for user.
