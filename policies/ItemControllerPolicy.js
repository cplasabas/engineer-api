const joi = require("joi")

module.exports = {
  createItem(req, res, next) {
    const schema = {
      name: joi.string().required()
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
      qty: joi.number().integer().required(),
      item_id: joi.number().integer().required(),
      action_id: joi.number().integer().required(),
      project_id: joi.number().integer().required(),
      supplier_id: joi.number().integer().required()
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