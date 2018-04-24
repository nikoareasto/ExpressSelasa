//add database mongoDB
// require('./config/db')

// add database mySql
require('./config/dbMySql')

// calling library
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

// hasil compile nya express dimasukan ke variable app
const app = express()

// router mongoDB
// const router = require('./config/routes')

// router mySql
const router = require('./config/routesSql')

// define port to 3000 example for run
app.set('port', 3001)

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
