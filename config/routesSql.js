const express = require('express')
const router = express.Router()

// routing
router
    .get('/', (req, res) => res.send('Hello Armand'))

module.exports = router