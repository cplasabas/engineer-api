const joi = require("joi")

module.exports = {
  createProject(req, res, next) {
    const schema = {
      name: joi.string().required(),
      client: joi.string().required(),
      date_started: joi.date().required(),
      status: joi.string().required()
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