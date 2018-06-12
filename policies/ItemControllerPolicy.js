const joi = require("joi")

module.exports = {
  createItem(req, res, next) {
    const schema = {
      name: joi.string()
    }

    const { error, value } = joi.validate(req.body, schema)

    if (!error) {
      next()
    } else {
      res.status(400).send({
        error: error.details[0].message
      })
    }
  },
  createLog(req, res, next) {
    const schema = {
      qty: joi.number().integer(),
      item_id: joi.number().integer(),
      action_id: joi.number().integer(),
      project_id: joi.number().integer(),
      supplier_id: joi.number().integer()
    }

    const { error, value } = joi.validate(req.body, schema)

    if (!error) {
      next()
    } else {
      res.status(400).send({
        error: error.details[0].message
      })
    }
  }
}