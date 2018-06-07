module.exports = (sequelize, DataTypes) =>
  sequelize.define('projects', {
    name: DataTypes.STRING,
    client: DataTypes.STRING,
    date_started: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    status: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  })

