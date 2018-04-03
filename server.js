//add database
require('./config/db')

// calling library
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

// hasil compile nya express dimasukan ke variable app
const app = express()
const router = require('./config/routes')

// define port to 3000 example for run
app.set('port', 3000)

// logger for every request
app.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
})

// set static directory for frontend
app.use(express.static(path.join(__dirname, 'public')))

// enable parsing posted forms
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

//  add some routing
app.use('/api', router)

const server = app.listen(app.get('port'), () => {
    const port = server.address().port
    console.log('Magic happens on port ' + port)
})
