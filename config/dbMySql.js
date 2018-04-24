// call the Libraries
const Sequelize = require ('sequelize')
const path = require('path')

const DATABASE = 'dlov_shop'
const USERNAME = 'root'
const PASSWORD = ''

const sequelize = new Sequelize (DATABASE, USERNAME, PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
})

sequelize
    .authenticate()
    .then(() => {
        console.log('connection has been made.')
    })
    .catch(err => console.error(err))

// IMPORT YOUR SCHEMA HERE
const db = {
    Brand: sequelize.import(path.join(__dirname, '../app/models/myBrand.model')),
    User: sequelize.import(path.join(__dirname, '../app/models/myUser.model')),

    // Export Database itself
    sequelize,
    Sequelize,
  }

  module.exports = db