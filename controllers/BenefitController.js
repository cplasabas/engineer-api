const { benefits } = require('../models')

module.exports = {

  index(req, res) {
    benefits.all(
      {
        attributes:{
          exclude:['password']
        }
      }).then(benefit => {
        res.status(200).send(benefit)
    })
  },

  show(req, res) {
    const id = req.params.id
    benefits.findAll({
      where: {
        id: id
      }
    }).then(benefit => {
      if (benefit && benefit.length > 0) {
        res.status(200).send(benefit)
      } else {
        res.status(204).send()
      }
    })
  },

  update(req, res) {
    const id = req.params.id
    benefits.update(req.body, {
      where: {
        id: id
      }
    }).then(benefit => {
      res.status(200).send({
        id: benefit._id, message: "benefit successfully update."
      })
    }).catch(error => {
      res.status(400).send({
        message: "Failed to update benefit."
      })
    })
  },

  delete(req, res) {
    const id = req.params.id
    benefits.destroy({
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