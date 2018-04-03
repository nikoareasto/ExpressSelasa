// database connection

const mongoose = require('mongoose')

// Employees Database url

const DB_URL = 'mongoDB://localhost:27017/employees'

// connect to database

mongoose.connect(DB_URL)

// event handling on database connection
// ES 6
mongoose.connection.on('connected', () =>
    console.log(`Mongoose connected to ${DB_URL}`))

// ES dibawah 6
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + DB_URL)
})

mongoose.connection.on('error', (err) =>
    console.log(`Mongoose connection error: ${err}`))

mongoose.connection.on('disconnected', () =>
    console.log(`Monggose Disconnected`))

const gracefullShutdown = (msg, callback) =>
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`)
        callback()
    })

// for app termination
process.on('SIGNIT', () => 
    gracefullShutdown('App termination (SIGINT)', () => 
    process.exit(0) ) )

// bring your schema dan model
require('../app/models/employee.model')