const { projects } = require('../models')

module.exports = {

  index(req, res) {
    projects.all(
      {
        attributes:{
          exclude:['password']
        }
      }).then(project => {
        res.status(200).send(project)
    })
  },

  show(req, res) {
    const id = req.params.id
    projects.findAll({
      where: {
        id: id
      }
    }).then(project => {
      if (project && project.length > 0) {
        res.status(200).send(project)
      } else {
        res.status(204).send()
      }
    })
  },

  update(req, res) {
    const id = req.params.id
    projects.update(req.body, {
      where: {
        id: id
      }
    }).then(project => {
      res.status(200).send({
        id: project._id, message: "project successfully update."
      })
    }).catch(error => {
      res.status(400).send({
        message: "Failed to update project."
      })
    })
  },

  delete(req, res) {
    const id = req.params.id
    projects.destroy({
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
  }

}