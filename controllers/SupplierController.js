const { suppliers } = require('../models')

module.exports = {

  index(req, res) {
    suppliers.all(
      {
        attributes:{
          exclude:['password']
        }
      }).then(supplier => {
        res.status(200).send(supplier)
    })
  },

  show(req, res) {
    const id = req.params.id
    suppliers.findAll({
      where: {
        id: id
      }
    }).then(supplier => {
      if (supplier && supplier.length > 0) {
        res.status(200).send(supplier)
      } else {
        res.status(204).send()
      }
    })
  },

  update(req, res) {
    const id = req.params.id
    suppliers.update(req.body, {
      where: {
        id: id
      }
    }).then(supplier => {
      res.status(200).send({
        id: supplier._id, message: "supplier successfully update."
      })
    }).catch(error => {
      res.status(400).send({
        message: "Failed to update supplier."
      })
    })
  },

  delete(req, res) {
    const id = req.params.id
    suppliers.destroy({
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