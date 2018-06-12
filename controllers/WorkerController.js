const { workers } = require('../models')
const { worker_attendance } = require('../models')
const { worker_benefits } = require('../models')
const { worker_projects } = require('../models')
const { worker_salary } = require('../models')

module.exports = {

  index(req, res) {
    workers.all().then(worker => {
        res.status(200).send(worker)
    })
  },

  show(req, res) {
    const id = req.params.id
    workers.findAll({
      where: {
        id: id
      }
    }).then(worker => {
      if (worker && worker.length > 0) {
        res.status(200).send(worker)
      } else {
        res.status(204).send()
      }
    })
  },

  update(req, res) {
    const id = req.params.id
    workers.update(req.body, {
      where: {
        id: id
      }
    }).then(worker => {
      res.status(200).send({
        id: worker._id, message: "worker successfully update."
      })
    }).catch(error => {
      res.status(400).send({
        message: "Failed to update worker."
      })
    })
  },

  async post(req, res) {
    try {
      var body = req.body

      await workers.create(body).then(workers => {
        res.status(201).send({
          workers
        })
      }).catch(() => {
        res.status(400).send({
          message: 'Worker already exists.'
        })
      })
    } catch (error) {
      res.status(400).send({
        message: 'Worker creation failed.'
      })
    }
  },

  delete(req, res) {
    const id = req.params.id
    workers.destroy({
      where: {
        id: id
      }
    }).then(() => {
      res.status(200).send({
        message: "Successfully deleted."
      })
    }).catch(error => {
      res.status(400).send({
        message: "Failed to delete."
      })
    })
  },

  indexAttendance(req, res) {
    const id = req.params.id

    worker_attendance.findAll({
      where: {
        worker_id: id
      },
      include:[
        {
          association:"worker"
        },
        {
          association: "project"
        },
        {
          association:"action"
        }
      ]
    }).then(attendance => {
        res.status(200).send(attendance)
      })
  },

  showAttendance(req, res) {
    const id = req.params.id
    const attendanceId = req.params.attendanceId
    worker_attendance.findAll({
      where: {
        id: attendanceId,
        worker_id: id
      },
      include: [
        {
          association: "worker"
        },
        {
          association: "project"
        },
        {
          association: "action"
        }
      ]
    }).then(attendance => {
      if (attendance && attendance.length > 0) {
        res.status(200).send(attendance)
      } else {
        res.status(204).send()
      }
    })
  },

  updateAttendance(req, res) {
    const id = req.params.id
    const attendanceId = req.params.attendanceId

    worker_attendance.update(req.body, {
      where: {
        id: attendanceId,
        worker_id: id
      }
    }).then(attendance => {
      res.status(200).send({
        id: attendance._id, message: "Attendance successfully update."
      })
    }).catch(error => {
      res.status(400).send({
        message: "Failed to update attendance."
      })
    })
  },

  async postAttendance(req, res) {
    try {
      var body = req.body
      body.worker_id = parseInt(req.params.id)

      await worker_attendance.create(body).then(attendance => {
        res.status(201).send({
          attendance
        })
      }).catch(() => {
        res.status(400).send({
          message: 'attendance already exists.'
        })
      })
    } catch (error) {
      res.status(400).send({
        message: 'attendance creation failed.'
      })
    }
  },

  deleteAttendance(req, res) {
    const id = req.params.id
    const attendanceId = req.params.attendanceId

    worker_attendance.destroy({
      where: {
        id: attendanceId,
        worker_id:id
      }
    }).then(() => {
      res.status(200).send({
        message: "Successfully deleted."
      })
    }).catch(error => {
      res.status(400).send({
        message: "Failed to delete."
      })
    })
  },

  indexBenefits(req, res) {
    const id = req.params.id

    worker_benefits.findAll({
      where: {
        worker_id: id
      },
      include: [
        {
          association: "worker"
        },
        {
          association: "benefit"
        }
      ]
    }).then(benefits => {
      res.status(200).send(benefits)
    })
  },

  showBenefits(req, res) {
    const id = req.params.id
    const benefitsId = req.params.benefitsId
    worker_benefits.findAll({
      where: {
        id: benefitsId,
        worker_id: id
      },
      include: [
        {
          association: "worker"
        },
        {
          association: "benefit"
        }
      ]
    }).then(benefit => {
      if (benefit && benefit.length > 0) {
        res.status(200).send(benefit)
      } else {
        res.status(204).send()
      }
    })
  },

  updateBenefits(req, res) {
    const id = req.params.id
    const benefitsId = req.params.benefitsId

    worker_benefits.update(req.body, {
      where: {
        id: benefitsId,
        worker_id: id
      }
    }).then(benefit => {
      res.status(200).send({
        id: benefit._id, message: "Benefit successfully update."
      })
    }).catch(error => {
      res.status(400).send({
        message: "Failed to update benefit."
      })
    })
  },

  async postBenefits(req, res) {
    try {
      var body = req.body
      body.worker_id = parseInt(req.params.id)

      await worker_benefits.create(body).then(benefit => {
        res.status(201).send({
          benefit
        })
      }).catch(error => {
        res.status(400).send({
          message: error
        })
      })
    } catch (error) {
      res.status(400).send({
        message: 'Benefit creation failed.'
      })
    }
  },

  deleteBenefits(req, res) {
    const id = req.params.id
    const benefitsId = req.params.benefitsId

    worker_benefits.destroy({
      where: {
        id: benefitsId,
        worker_id: id
      }
    }).then(() => {
      res.status(200).send({
        message: "Successfully deleted."
      })
    }).catch(error => {
      res.status(400).send({
        message: "Failed to delete."
      })
    })
  },

  indexProjects(req, res) {
    const id = req.params.id

    worker_projects.findAll({
      where: {
        worker_id: id
      },
      include: [
        {
          association: "worker"
        },
        {
          association: "project"
        }
      ]
    }).then(project => {
      res.status(200).send(project)
    })
  },

  showProjects(req, res) {
    const id = req.params.id
    const projectsId = req.params.projectsId
    worker_projects.findAll({
      where: {
        id: projectsId,
        worker_id: id
      },
      include: [
        {
          association: "worker"
        },
        {
          association: "project"
        }
      ]
    }).then(project => {
      if (project && project.length > 0) {
        res.status(200).send(project)
      } else {
        res.status(204).send()
      }
    })
  },

  updateProjects(req, res) {
    const id = req.params.id
    const projectsId = req.params.projectsId

    worker_projects.update(req.body, {
      where: {
        id: projectsId,
        worker_id: id
      }
    }).then(project => {
      res.status(200).send({
        id: project._id, message: "Project successfully update."
      })
    }).catch(error => {
      res.status(400).send({
        message: "Failed to update project."
      })
    })
  },

  async postProjects(req, res) {
    try {
      var body = req.body
      body.worker_id = parseInt(req.params.id)

      await worker_projects.create(body).then(project => {
        res.status(201).send({
          project
        })
      }).catch(error => {
        res.status(400).send({
          message: error
        })
      })
    } catch (error) {
      res.status(400).send({
        message: 'Project creation failed.'
      })
    }
  },

  deleteProjects(req, res) {
    const id = req.params.id
    const projectsId = req.params.projectsId

    worker_projects.destroy({
      where: {
        id: projectsId,
        worker_id: id
      }
    }).then(() => {
      res.status(200).send({
        message: "Successfully deleted."
      })
    }).catch(error => {
      res.status(400).send({
        message: "Failed to delete."
      })
    })
  },

  indexSalary(req, res) {
    const id = req.params.id

    worker_salary.findAll({
      where: {
        worker_id: id
      },
      include: [
        {
          association: "worker"
        }
      ]
    }).then(salary => {
      res.status(200).send(salary)
    })
  },

  showSalary(req, res) {
    const id = req.params.id
    const salaryId = req.params.salaryId
    worker_salary.findAll({
      where: {
        id: salaryId,
        worker_id: id
      },
      include: [
        {
          association: "worker"
        }
      ]
    }).then(salary => {
      if (salary && salary.length > 0) {
        res.status(200).send(salary)
      } else {
        res.status(204).send()
      }
    })
  },

  updateSalary(req, res) {
    const id = req.params.id
    const salaryId = req.params.salaryId

    worker_salary.update(req.body, {
      where: {
        id: salaryId,
        worker_id: id
      }
    }).then(salary => {
      res.status(200).send({
        id: salary._id, message: "Salary successfully update."
      })
    }).catch(error => {
      res.status(400).send({
        message: "Failed to update salary."
      })
    })
  },

  async postSalary(req, res) {
    try {
      var body = req.body
      body.worker_id = parseInt(req.params.id)

      await worker_salary.create(body).then(salary => {
        res.status(201).send({
          salary
        })
      }).catch(error => {
        res.status(400).send({
          message: error
        })
      })
    } catch (error) {
      res.status(400).send({
        message: 'Project creation failed.'
      })
    }
  },

  deleteSalary(req, res) {
    const id = req.params.id
    const salaryId = req.params.salaryId

    worker_salary.destroy({
      where: {
        id: salaryId,
        worker_id: id
      }
    }).then(() => {
      res.status(200).send({
        message: "Successfully deleted."
      })
    }).catch(error => {
      res.status(400).send({
        message: "Failed to delete."
      })
    })
  }


}