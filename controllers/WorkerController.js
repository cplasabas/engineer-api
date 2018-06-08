const { workers } = require('../models')

module.exports = {

  index(req, res) {
    workers.all(
      {
        attributes:{
          exclude:['password']
        }
      }).then(worker => {
        res.status(200).send(worker)
    })
  },

  show(req, res) {
    const id = req.params.id
    workers.findAll({
      where: {
        id: id
      }
    }).then(worker => {
      if (worker && worker.length > 0) {
        res.status(200).send(worker)
      } else {
        res.status(204).send()
      }
    })
  },

  update(req, res) {
    const id = req.params.id
    workers.update(req.body, {
      where: {
        id: id
      }
    }).then(worker => {
      res.status(200).send({
        id: worker._id, message: "worker successfully update."
      })
    }).catch(error => {
      res.status(400).send({
        message: "Failed to update worker."
      })
    })
  },

  delete(req, res) {
    const id = req.params.id
    workers.destroy({
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