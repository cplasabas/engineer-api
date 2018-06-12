const { items } = require('../models')
const { item_log } = require('../models')

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

  async post(req, res) {
    try {
      var body = req.body

      await items.create(body).then(items => {
        res.status(201).send({
          items
        })
      }).catch(() => {
        res.status(400).send({
          message: 'Item already exists.'
        })
      })
    } catch (error) {
      res.status(400).send({
        message: 'Item creation failed.'
      })
    }
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
  },

  indexLog(req, res) {
    const id = req.params.id

    item_log.findAll({
      where: {
        item_id: id
      },
      include: [
        {
          association: "item"
        },
        {
          association: "action"
        },
        {
          association: "project"
        },
        {
          association: "supplier"
        }
      ]
    }).then(item => {
      res.status(200).send(item)
    })
  },

  showLog(req, res) {
    const id = req.params.id
    const logId = req.params.logId
    item_log.findAll({
      where: {
        id: logId,
        item_id: id
      },
      include: [
        {
          association: "item"
        },
        {
          association: "action"
        },
        {
          association: "project"
        },
        {
          association: "supplier"
        }
      ]
    }).then(attendance => {
      if (attendance && attendance.length > 0) {
        res.status(200).send(attendance)
      } else {
        res.status(204).send()
      }
    })
  },

  async postLog(req, res) {
    try {
      var body = req.body
      body.item_id = parseInt(req.params.id)

      await item_log.create(body).then(attendance => {
        res.status(201).send({
          attendance
        })
      }).catch(error => {
        res.status(400).send({
          message: error
        })
      })
    } catch (error) {
      res.status(400).send({
        message: error
      })
    }
  }
}