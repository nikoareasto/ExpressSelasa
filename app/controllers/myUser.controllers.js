const db = require('../../config/dbMySql')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {
  User
} = db

//register
const register = (req, res) => {
  const {
    username,
    password,
    email,
    handphone,
  } = req.body

  return User
    .findOrCreate ({
      where : {
        username
      },
      defaults : {
        // di database field user_id tidak boleh null
        user_id : '',
        password : bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        email,
        handphone,
      }
    })
    .spread ((user, created) => {
      if (created) {
        console.log (` user has been created : ${user}`)
        res
          .status(200)
          .json(user)
      }
      else
        res
          .status(400)
          .json({ message : ` username is reserved `})
    })

}

//login
const login = (req, res) => {
  const {
    username,
    password,
  } = req.body

  return User
    .findOne({
      where : {
        username
      }
    })
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        console.log( `user found : ${user}`)
        const token = jwt.sign({
          username: user.username,
          email: user.email,
        }, ` rahasia@s3cr3t `, {
          // expire dalam 3600 detik atau 1 jam
          expiresIn: 3600,
        })
        res
          .status(200)
          .json( { success: true, token })
      }
      else
        res
          .status(401)
          .json(`unauthorized`)
    })
}

// authentication
const authentication = (req, res, next) => {
  const {
    authorization
  } = req.headers

  if (authorization) {
    jwt.verify(authorization, ` rahasia@s3cr3t `, (error, decoded) => {
      if (error) {
        console.log(error)
        res
          .status(401)
          .json( `your session is expired` )
      }
      else {
        req.username = decoded.username
        req.email = decoded.email
        next()
      }
    })
  }
  else
    res
      .status(403)
      .json(' no token provided ')
}


module.exports = {
  register,
  login,
  authentication,
}