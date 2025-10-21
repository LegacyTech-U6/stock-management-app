// models/Setting.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Setting = sequelize.define('Setting', {
    stock_alert_threshold: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },
  });

  

  return Setting;
};
