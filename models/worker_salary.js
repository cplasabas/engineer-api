module.exports = (sequelize, DataTypes) =>
  sequelize.define('worker_salary', {
    amount: DataTypes.FLOAT,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  })

