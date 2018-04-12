const express = require('express')
const router = express.Router()

// routing test doank
router
    .get('/', (req, res) => res.send('Hello Armand'))

// import your controller
const ctrlBrand = require('../app/controllers/myBrand.controllers')

// new routing
router
  .route('/brand')
  .get(ctrlBrand.getBrand)

router
  .route('/brand/:id')
  .delete(ctrlBrand.deleteBrand)


module.exports = router