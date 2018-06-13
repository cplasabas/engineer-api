const joi = require("joi")

module.exports = {
  createInventory(req, res, next) {
    const schema = {
      on_stock: joi.number().integer().required(),
      item_id: joi.number().integer().required()
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