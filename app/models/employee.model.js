const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: String,
})

mongoose.model('Employee', employeeSchema)