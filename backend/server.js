require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

//creates the express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


//routes
app.use('/api/workouts/', workoutRoutes)

//connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests only after successful connection to the database
        app.listen(process.env.PORT, () => {
        console.log('listening on port', process.env.PORT)
})
    })
    .catch((error) => {
        // if there's an unsuccessful connection, print the error.
        console.log(error)
    })