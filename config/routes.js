const express = require('express')
const router = express.Router()

// controller
const ctrlUser = require('../app/controllers/user.controllers')

// routing
router
    .get('/', ctrlUser.getUser)

router
    .route('/employee')
    .get(ctrlUser.getEmployee)
    .post(ctrlUser.addOneEmployee)


router
    .route('/employee/:id')
    .get(ctrlUser.getEmployeeByID)
    .put(ctrlUser.updateOneEmployee)
    .delete(ctrlUser.deleteUserByID)

// route buat nyari employee berdasarkan nama
// router
//     .route('/employee/name/:name')
//     .get(ctrlUser.getEmployeeByName)

router
    .get('/:id/:name', ctrlUser.getUserByID)


module.exports = router

