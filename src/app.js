const express = require('express')
require('./db/mongoose')
const userRouter = require('./routes/user-router')
const friendRouter = require('./routes/friend-router')
const app = express()

app.use(express.json())
app.use(userRouter)
app.use(friendRouter)

module.exports = app

// TODO: Once we build a frontend, build out scheduling with agenda for user.
