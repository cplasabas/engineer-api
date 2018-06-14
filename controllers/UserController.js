const { users } = require('../models')
const { user_permissions } = require('../models')

module.exports = {
  index(req, res) {
    users.all(
      {
        attributes:{
          exclude:['password']
        }
      }).then(user => {
        res.status(200).send(user)
    })
  },
  show(req, res) {
    const id = req.params.id
    users.findAll({
      where: {
        id: id
      },
      attributes: { 
        exclude: ['password'] 
      } 
    }).then(user => {
      if (user && user.length > 0) {
        res.status(200).send(user)
      } else {
        res.status(204).send()
      }
    })
  },
  update(req, res) {
    const id = req.params.id
    users.update(req.body, {
      where: {
        id: id
      }
    }).then(user => {
      res.status(200).send({
        id: user._id, message: "User successfully update."
      })
    }).catch(error => {
      res.status(400).send({
        message: "Failed to update user."
      })
    })
  },
  delete(req, res) {
    const id = req.params.id
    users.destroy({
      where: {
        id: id
      }
    }).then(() => {
      res.status(200).send({
        message: "Successfully deleted."
      })
    }).catch(error => {
      res.status(400).send({
        message: "Failed to delete."
      })
    })
  },
  indexPermission(req, res) {
    user_permissions.all().then(user => {
        res.status(200).send(user)
      })
  },
  showPermission(req, res) {
    const id = req.params.id
    const permissionId = req.params.permissionId

    user_permissions.findAll({
      where: {
        id: permissionId,
        user_id: id
      }
    }).then(user => {
      if (user && user.length > 0) {
        res.status(200).send(user)
      } else {
        res.status(204).send()
      }
    })
  }, 
  async postPermission(req, res) {
    try {
      var body = req.body
      body.user_id = parseInt(req.params.id)

      await user_permissions.create(body).then(permission => {
        res.status(201).send({
          permission
        })
      }).catch(error => {
        res.status(400).send({
          message: error
        })
      })
    } catch (error) {
      res.status(400).send({
        message: 'Permission creation failed.'
      })
    }
  },
  updatePermission(req, res) {
    const id = req.params.id
    const permissionId = req.params.permissionId

    user_permissions.update(req.body, {
      where: {
        id: permissionId,
        user_id: id
      }
    }).then(user => {
      res.status(200).send({
        id: user._id, message: "Permission successfully update."
      })
    }).catch(error => {
      res.status(400).send({
        message: "Failed to update permission."
      })
    })
  },
  deletePermission(req, res) {
    const id = req.params.id
    const permissionId = req.params.permissionId

    user_permissions.destroy({
      where: {
        id: permissionId,
        user_id: id
      }
    }).then(() => {
      res.status(200).send({
        message: "Successfully deleted."
      })
    }).catch(error => {
      res.status(400).send({
        message: "Failed to delete."
      })
    })
  }
}