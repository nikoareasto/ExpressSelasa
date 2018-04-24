const express = require('express')
const router = express.Router()

// routing test doank
router
    .get('/', (req, res) => res.send('Hello Armand'))

// import your controller
const ctrlBrand = require('../app/controllers/myBrand.controllers')
const ctrlUser = require('../app/controllers/myUser.controllers')

// new routing
router
  .route('/brand')
  .get(ctrlUser.authentication, ctrlBrand.getBrand)

router
  .route('/brand/:id')
  .delete(ctrlBrand.deleteBrand)

// router untuk register
router
  .route('/register')
  .post(ctrlUser.register)

// router untuk login
router
  .route('/login')
  .post(ctrlUser.login)


module.exports = router