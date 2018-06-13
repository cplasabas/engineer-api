const joi = require("joi")

module.exports = {
  createUserPermission(req, res, next) {
    const schema = {
      first_name: joi.string().required(),
      last_name: joi.string().required(),
      email: joi.string().email().required(),
      username: joi.string().required(),
      password: joi.string().required(),
      contact: joi.string().allow(''),
      address: joi.string().allow(''),
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