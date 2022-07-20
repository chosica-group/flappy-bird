const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define('comments', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    timestamps: true
  });
