const AuthController = require('./controllers/AuthController')
const AuthControllerPolicy = require('./policies/AuthControllerPolicy')

const ProjectController = require('./controllers/ProjectController')

const WorkerController = require('./controllers/WorkerController')

const ItemController = require('./controllers/ItemController')

const SupplierController = require('./controllers/SupplierController')

const InventoryController = require('./controllers/InventoryController')

const BenefitController = require('./controllers/BenefitController')

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

  //Users
  app.get('/users',guard.check('users:read'), UserController.index)
  app.get('/users/:id', guard.check('users:read'), UserController.show)
  app.put('/users/:id', guard.check(['users:read','users:write']), UserController.update)
  app.delete('/users/:id', guard.check(['users:read','users:write']), UserController.delete)

  //Projects
  app.get('/projects', guard.check('projects:read'), ProjectController.index)
  app.get('/projects/:id', guard.check('projects:read'), ProjectController.show)
  app.put('/projects/:id', guard.check(['projects:read', 'projects:write']), ProjectController.update)
  app.delete('/projects/:id', guard.check(['projects:read', 'projects:write']), ProjectController.delete)

  //Workers
  app.get('/workers', guard.check('workers:read'), WorkerController.index)
  app.get('/workers/:id', guard.check('workers:read'), WorkerController.show)
  app.put('/workers/:id', guard.check(['workers:read', 'workers:write']), WorkerController.update)
  app.delete('/workers/:id', guard.check(['workers:read', 'workers:write']), WorkerController.delete)

  //Items
  app.get('/items', guard.check('items:read'), ItemController.index)
  app.get('/items/:id', guard.check('items:read'), ItemController.show)
  app.put('/items/:id', guard.check(['items:read', 'items:write']), ItemController.update)
  app.delete('/items/:id', guard.check(['items:read', 'items:write']), ItemController.delete)

  //Suppliers
  app.get('/suppliers', guard.check('suppliers:read'), SupplierController.index)
  app.get('/suppliers/:id', guard.check('suppliers:read'), SupplierController.show)
  app.put('/suppliers/:id', guard.check(['suppliers:read', 'suppliers:write']), SupplierController.update)
  app.delete('/suppliers/:id', guard.check(['suppliers:read', 'suppliers:write']), SupplierController.delete)

  //Inventory
  app.get('/inventory', guard.check('inventory:read'), InventoryController.index)
  app.get('/inventory/:id', guard.check('inventory:read'), InventoryController.show)
  app.put('/inventory/:id', guard.check(['inventory:read', 'inventory:write']), InventoryController.update)
  app.delete('/inventory/:id', guard.check(['inventory:read', 'inventory:write']), InventoryController.delete)

  //Benefits
  app.get('/benefits', guard.check('benefits:read'), BenefitController.index)
  app.get('/benefits/:id', guard.check('benefits:read'), BenefitController.show)
  app.put('/benefits/:id', guard.check(['benefits:read', 'benefits:write']), BenefitController.update)
  app.delete('/benefits/:id', guard.check(['benefits:read', 'benefits:write']), BenefitController.delete)

  app.use(function (err, req, res, next) {
    if (err.status === 403) {
      res.status(403).send({
        "error": true
      })
    }
  })
}