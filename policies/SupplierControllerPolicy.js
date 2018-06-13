const joi = require("joi")

module.exports = {
  createSupplier(req, res, next) {
    const schema = {
      name: joi.string().required(),
      address: joi.string().required(),
      contact: joi.string().required()
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