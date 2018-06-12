const joi = require("joi")

module.exports = {
  createUserPermission(req, res, next) {
    const schema = {
      first_name: joi.string(),
      last_name: joi.string(),
      email: joi.string().email(),
      username: joi.string(),
      password: joi.string(),
      contact: joi.string().allow(''),
      address: joi.string().allow(''),
      level: joi.number().integer(),
      parent: joi.number().integer(),
      user_type_id: joi.number().integer(),
      user_group_id: joi.number().integer()
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