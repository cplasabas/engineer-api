const { users } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = {
  async login(req, res) {
    await users.findOne({
          where:{
            username: req.body.username
          },
          include: [{
            association: 'permissions'
          }],
        }
      ).then(user => {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const payload = {
          user: user.dataValues,
          permissions:[]
        }

        const user_permissions = user.permissions
        delete user.dataValues.permissions
        delete user.dataValues.password

        //Permissions
        for (let a = 0; a < user_permissions.length; a++) {
          var permission = user_permissions[a].dataValues;
          permission = permission.table + ":" + permission.action
          payload.permissions.push(permission)
        }

        var token = jwt.sign(payload, config.secret, {
          expiresIn: 86400
        })

        res.status(200).send(
          { 
            data: {
              type: 'user',
              id: user.id,
              attributes: {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                username: user.username,
                token: token
              },
              links:{
                self: ""
              }
            } 
          })
      } else {
        res.status(401).send({
          message: 'Password not correct.'
        })
      }
    }).catch((err) => {
      console.log(err)
      res.status(400).send({
        message: 'Username not found.'
      })
    })
  },
  async register(req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8)
    var body = req.body
    body.password = hashedPassword

    try {
      await users.create(body).then(user => {
        delete user.dataValues.password
        res.status(201).send({
          user
        })
      }).catch(() => {
        res.status(400).send({
          message: 'User already exists.'
        })
      })
    } catch (error) {
      res.status(400).send({
        message: 'User registration failed.'
      })
    }
  }
}
