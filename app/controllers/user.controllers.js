const mongoose = require('mongoose')
const Employee = mongoose.model('Employee')

// router
// value : request, result, etc.
// request : data yang dikirim dari klien
// respond : fungsi dari serve, isi fungsi dgn data yg dikirim

module.exports.getEmployee = (req, res) =>
    Employee
        .find()
        .exec((err, result) => {
            console.log(err)
            console.log(result)

        // filter respond dari server
        // error dari server
        if(err) {
            console.log('Error finding Employee')
            res
                .status(500)
                .json({ message : 'Error Finding Employee'})

        // data tidak ditemukan
        } else if(result.length == 0) {
            console.log('Data Employee not Found')
            res
                .status(404)
                .json({ message : 'Data not found'})

        //data ditemukan
        } else {
            console.log(`Found Employee: ${result.length}`)
            res
                .status(200)
                .json(result)
        }
        })

// get employee data by ID
module.exports.getEmployeeByID = (req, res) => {
    const { id } = req.params
    console.log(`Get Employee with ${id}`)

// untuk cari berdasarkan field :
// .find({ name: name})

    return Employee
    .findById(id)
    .exec((err, result) => {
        console.log(err)
        console.log(result)

    // filter respond dari server
    // error dari server
    if(err) {
        console.log('Error finding Employee')
        res
            .status(500)
            .json({ message : 'Error Finding Employee'})

    // data tidak ditemukan
    } else if(result.length == 0) {
        console.log('Data Employee not Found')
        res
            .status(404)
            .json({ message : 'Data not found'})

    //data ditemukan
    } else {
        console.log(`Found Employee: ${result.length}`)
        res
            .status(200)
            .json(result)
    }
})
}

// insert an Employee
module.exports.addOneEmployee = (req, res) => {
    const{ title, name, address } = req.body
    console.log('post new employee')

    return Employee
        .create({
            name,
            title,
            address,
        }, (err, result) => {

            // filter respond dari server
            // error dari server

            if(err) {
                console.log('Error creating Employee')
                res
                    .status(500)
                    .json({ message : 'Error creating Employee' })

            // data ditemukan
            } else {
                console.log(`Employee created: ${result}`)
                res
                    .status(201)
                    .json({ 
                        message : 'Employee berhasiiiilll dibuat',
                         data: result
                    })
            }
        })
    }

// update employee

module.exports.updateOneEmployee = (req, res) => {
    const { id } = req.params
    const { name, title, address } = req.body

    return Employee
        .findById(id)
        .exec((err, employee) => {
            if (err) {
                console.log(`Error finding employee with id : ${id}`)

                // kirim respond
                employee
                .status(500)
                .json(err)
            } else if (!employee) {
                console.log('Data employee not found')
                res
                    .status(404)
                    .json({ message : 'Data not found' })
            } else {
                if (title)
                employee.title = title

                if (name)
                employee.name = name

                if (address)
                employee.address = address

                // save to database
                employee
                    .save((err, updateEmployee) => {
                        if (err)
                        res
                            .status(500)
                            .json(err)
                        else
                        res
                            .status(201)
                            .json(updateEmployee)
                    })
            }
        })
    }

// cara singkat update employee

// module.exports.updateOneEmployee = (req, res) =>
//     Employee
//         .findByIdAndUpdate(

//             // ID
//             req.params.id,

//             // body data
//             { $set: ( ...req.body)},

//             // callback
//             err => {
//                 if (err)
//                     res 
//                         .status(500)
//                         .json(err)
                
//                 else
//                     res
//                         .status(204)
//                         .json()
//             }
//         )

// delete user
module.exports.deleteUserByID = (req, res) => {
    const { id } = req.params
    console.log(`delete user by id : ${id}`)

    return Employee
        .findByIdAndRemove(id)
        .exec((err, result) => {
            if(err)
                res
                .status(500)
                .json(err)
            else
                res
                .status(204)
                .json()
        })
}

module.exports.getUser = (request, respond) => {
    respond.send('Hello Armand')
}

module.exports.getUserByID = (request, respond) => {
    respond.send({
        id: request.params.id,
        name: request.params.name
    })
}