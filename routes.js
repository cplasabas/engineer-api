const AuthController = require('./controllers/AuthController')
const AuthControllerPolicy = require('./policies/AuthControllerPolicy')

const UserController = require('./controllers/UserController')

const JwtControllerPolicy = require('./policies/JwtControllerPolicy')

var guard = require('express-jwt-permissions')({
  requestProperty: 'decoded',
  permissionsProperty: 'permissions'
})

module.exports = (app) => {

  app.post('/register', AuthControllerPolicy.register, AuthController.register)
  app.post('/login', AuthController.login)

  app.use('/', JwtControllerPolicy.secure)

  app.get('/users',guard.check('users:read'), UserController.index)
  app.get('/users/:id', guard.check('users:read'), UserController.show)
  app.put('/users/:id', guard.check(['users:read','users:write']), UserController.update)
  app.delete('/users/:id', guard.check(['users:read','users:write']), UserController.delete)

  app.use(function (err, req, res, next) {
    if (err.status === 403) {
      res.status(403).send({
        "error": true
      })
    }
  })
}