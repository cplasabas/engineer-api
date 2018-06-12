const joi = require("joi")

module.exports = {
  createBenefit(req, res, next) {
    const schema = {
      name: joi.string(),
      percentage: joi.number().precision(2)
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