const joi = require("joi")

module.exports = {
  createWorker(req, res, next) {
    const schema = {
      first_name: joi.string().required(),
      last_name: joi.string().required(),
      address: joi.string().allow(''),
      date_employed: joi.date().required()
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

  createWorkerAttendance(req, res, next) {
    const schema = {
      project_id: joi.number().integer().required(),
      action_id: joi.number().integer().required()
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

  createWorkerBenefits(req, res, next) {
    const schema = {
      benefit_id: joi.number().integer().required()
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

  createWorkerProjects(req, res, next) {
    const schema = {
      project_id: joi.number().integer().required()
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
  createWorkerSalary(req, res, next) {
    const schema = {
      amount: joi.number().precision(2).required()
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