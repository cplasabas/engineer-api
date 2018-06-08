const { inventorys } = require('../models')

module.exports = {

  index(req, res) {
    inventorys.all(
      {
        attributes:{
          exclude:['password']
        }
      }).then(inventory => {
        res.status(200).send(inventory)
    })
  },

  show(req, res) {
    const id = req.params.id
    inventorys.findAll({
      where: {
        id: id
      }
    }).then(inventory => {
      if (inventory && inventory.length > 0) {
        res.status(200).send(inventory)
      } else {
        res.status(204).send()
      }
    })
  },

  update(req, res) {
    const id = req.params.id
    inventorys.update(req.body, {
      where: {
        id: id
      }
    }).then(inventory => {
      res.status(200).send({
        id: inventory._id, message: "inventory successfully update."
      })
    }).catch(error => {
      res.status(400).send({
        message: "Failed to update inventory."
      })
    })
  },

  delete(req, res) {
    const id = req.params.id
    inventorys.destroy({
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