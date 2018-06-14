const AuthController = require('./controllers/AuthController')
const AuthControllerPolicy = require('./policies/AuthControllerPolicy')

const ProjectController = require('./controllers/ProjectController')
const ProjectControllerPolicy = require('./policies/ProjectControllerPolicy')

const WorkerController = require('./controllers/WorkerController')
const WorkerControllerPolicy = require('./policies/WorkerControllerPolicy')

const ItemController = require('./controllers/ItemController')
const ItemControllerPolicy = require('./policies/ItemControllerPolicy')

const SupplierController = require('./controllers/SupplierController')
const SupplierControllerPolicy = require('./policies/SupplierControllerPolicy')

const InventoryController = require('./controllers/InventoryController')
const InventoryControllerPolicy = require('./policies/InventoryControllerPolicy')

const BenefitController = require('./controllers/BenefitController')
const BenefitControllerPolicy = require('./policies/BenefitControllerPolicy')

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

  //User Permissions
  app.post('/users/:id/permissions', [guard.check(['users:read', 'users:write']),
    AuthControllerPolicy.createPermission], UserController.postPermission)
  app.get('/users/:id/permissions', guard.check(['users:read', 'users:write']), UserController.indexPermission)
  app.get('/users/:id/permissions/:permissionId', guard.check(['users:read', 'users:write']),
    UserController.showPermission)
  app.put('/users/:id/permissions/:permissionId', guard.check(['users:read', 'users:write']),
    UserController.updatePermission)
  app.delete('/users/:id/permissions/:permissionId', guard.check(['users:read', 'users:write']),
    UserController.deletePermission)

  //Projects
  app.get('/projects', guard.check('projects:read'), ProjectController.index)
  app.post('/projects', [guard.check(['projects:read', 'projects:write']), ProjectControllerPolicy.createProject], ProjectController.post)
  app.get('/projects/:id', guard.check('projects:read'), ProjectController.show)
  app.put('/projects/:id', guard.check(['projects:read', 'projects:write']), ProjectController.update)
  app.delete('/projects/:id', guard.check(['projects:read', 'projects:write']), ProjectController.delete)

  //Workers
  app.get('/workers', guard.check('workers:read'), WorkerController.index)
  app.post('/workers', [guard.check(['workers:read', 'workers:write']), WorkerControllerPolicy.createWorker], WorkerController.post)
  app.get('/workers/:id', guard.check('workers:read'), WorkerController.show)
  app.put('/workers/:id', guard.check(['workers:read', 'workers:write']), WorkerController.update)
  app.delete('/workers/:id', guard.check(['workers:read', 'workers:write']), WorkerController.delete)

  //Worker Attendance
  app.post('/workers/:id/attendance', [guard.check(['workers:read', 'workers:write']), 
    WorkerControllerPolicy.createWorkerAttendance], WorkerController.postAttendance)
  app.get('/workers/:id/attendance', guard.check(['workers:read', 'workers:write']), WorkerController.indexAttendance)
  app.get('/workers/:id/attendance/:attendanceId', guard.check(['workers:read', 'workers:write']),
    WorkerController.showAttendance)
  app.put('/workers/:id/attendance/:attendanceId', guard.check(['workers:read', 'workers:write']), 
    WorkerController.updateAttendance)
  app.delete('/workers/:id/attendance/:attendanceId', guard.check(['workers:read', 'workers:write']),
    WorkerController.deleteAttendance)

  //Worker Benefits
  app.post('/workers/:id/benefits', [guard.check(['workers:read', 'workers:write']),
    WorkerControllerPolicy.createWorkerBenefits], WorkerController.postBenefits)
  app.get('/workers/:id/benefits', guard.check(['workers:read', 'workers:write']), WorkerController.indexBenefits)
  app.get('/workers/:id/benefits/:benefitsId', guard.check(['workers:read', 'workers:write']),
    WorkerController.showBenefits)
  app.put('/workers/:id/benefits/:benefitsId', guard.check(['workers:read', 'workers:write']),
    WorkerController.updateBenefits)
  app.delete('/workers/:id/benefits/:benefitsId', guard.check(['workers:read', 'workers:write']),
    WorkerController.deleteBenefits)

  // //Worker Projects
  app.post('/workers/:id/projects', [guard.check(['workers:read', 'workers:write']),
  WorkerControllerPolicy.createWorkerProjects], WorkerController.postProjects)
  app.get('/workers/:id/projects', guard.check(['workers:read', 'workers:write']), WorkerController.indexProjects)
  app.get('/workers/:id/projects/:projectsId', guard.check(['workers:read', 'workers:write']),
    WorkerController.showProjects)
  app.put('/workers/:id/projects/:projectsId', guard.check(['workers:read', 'workers:write']),
    WorkerController.updateProjects)
  app.delete('/workers/:id/projects/:projectsId', guard.check(['workers:read', 'workers:write']),
    WorkerController.deleteProjects)

  //Worker Salary
  app.post('/workers/:id/salary', [guard.check(['workers:read', 'workers:write']),
  WorkerControllerPolicy.createWorkerSalary], WorkerController.postSalary)
  app.get('/workers/:id/salary', guard.check(['workers:read', 'workers:write']), WorkerController.indexSalary)
  app.get('/workers/:id/salary/:salaryId', guard.check(['workers:read', 'workers:write']),
    WorkerController.showSalary)
  app.put('/workers/:id/salary/:salaryId', guard.check(['workers:read', 'workers:write']),
    WorkerController.updateSalary)
  app.delete('/workers/:id/salary/:salaryId', guard.check(['workers:read', 'workers:write']),
    WorkerController.deleteSalary)
  
  //Items
  app.get('/items', guard.check('items:read'), ItemController.index)
  app.post('/items', [guard.check(['items:read', 'items:write']), ItemControllerPolicy.createItem], ItemController.post)
  app.get('/items/:id', guard.check('items:read'), ItemController.show)
  app.put('/items/:id', guard.check(['items:read', 'items:write']), ItemController.update)
  app.delete('/items/:id', guard.check(['items:read', 'items:write']), ItemController.delete)

  //Item Log
  app.get('/items/:id/log', guard.check('items:read'), ItemController.indexLog)
  app.post('/items/:id/log', [guard.check(['items:read', 'items:write']),
    ItemControllerPolicy.createLog], ItemController.postLog)
  app.get('/items/:id/log/:logId', guard.check('items:read'), ItemController.showLog)

  //Suppliers
  app.get('/suppliers', guard.check('suppliers:read'), SupplierController.index)
  app.post('/suppliers', [guard.check(['suppliers:read', 'suppliers:write']), SupplierControllerPolicy.createSupplier], SupplierController.post)
  app.get('/suppliers/:id', guard.check('suppliers:read'), SupplierController.show)
  app.put('/suppliers/:id', guard.check(['suppliers:read', 'suppliers:write']), SupplierController.update)
  app.delete('/suppliers/:id', guard.check(['suppliers:read', 'suppliers:write']), SupplierController.delete)

  //Inventory
  app.get('/inventory', guard.check('inventory:read'), InventoryController.index)
  app.post('/inventory', [guard.check(['inventory:read', 'inventory:write']), InventoryControllerPolicy.createInventory], InventoryController.post)
  app.get('/inventory/:id', guard.check('inventory:read'), InventoryController.show)
  app.put('/inventory/:id', guard.check(['inventory:read', 'inventory:write']), InventoryController.update)
  app.delete('/inventory/:id', guard.check(['inventory:read', 'inventory:write']), InventoryController.delete)

  //Benefits
  app.get('/benefits', guard.check('benefits:read'), BenefitController.index)
  app.post('/benefits', [guard.check(['benefits:read', 'benefits:write']), BenefitControllerPolicy.createBenefit], BenefitController.post)
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