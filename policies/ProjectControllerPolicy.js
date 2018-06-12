const joi = require("joi")

module.exports = {
  createProject(req, res, next) {
    const schema = {
      name: joi.string(),
      client: joi.string(),
      date_started: joi.date(),
      status: joi.number().integer()
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