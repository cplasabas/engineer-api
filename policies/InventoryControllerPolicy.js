const joi = require("joi")

module.exports = {
  createInventory(req, res, next) {
    const schema = {
      on_stock: joi.number().integer(),
      item_id: joi.number().integer()
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