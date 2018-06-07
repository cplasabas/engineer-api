module.exports = (sequelize, DataTypes) =>
  sequelize.define('user_permissions', {
    table: DataTypes.STRING,
    action: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  })

