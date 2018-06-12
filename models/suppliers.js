module.exports = (sequelize, DataTypes) =>
  sequelize.define('suppliers', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    contact: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  })

