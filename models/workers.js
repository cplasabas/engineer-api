module.exports = (sequelize, DataTypes) =>
  sequelize.define('workers', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date_employed: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  })
