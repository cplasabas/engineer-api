module.exports = (sequelize, DataTypes) =>
  sequelize.define('benefits', {
    name: DataTypes.STRING,
    percentage: DataTypes.FLOAT,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  })

