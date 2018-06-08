const { items } = require('../models')

module.exports = {

  index(req, res) {
    items.all(
      {
        attributes:{
          exclude:['password']
        }
      }).then(item => {
        res.status(200).send(item)
    })
  },

  show(req, res) {
    const id = req.params.id
    items.findAll({
      where: {
        id: id
      }
    }).then(item => {
      if (item && item.length > 0) {
        res.status(200).send(item)
      } else {
        res.status(204).send()
      }
    })
  },

  update(req, res) {
    const id = req.params.id
    items.update(req.body, {
      where: {
        id: id
      }
    }).then(item => {
      res.status(200).send({
        id: item._id, message: "item successfully update."
      })
    }).catch(error => {
      res.status(400).send({
        message: "Failed to update item."
      })
    })
  },

  delete(req, res) {
    const id = req.params.id
    items.destroy({
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