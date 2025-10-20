// models/Activity.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Activity = sequelize.define('Activity', {
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entity_type: DataTypes.STRING,
    entity_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    ip_address: DataTypes.STRING,
    user_agent: DataTypes.TEXT,
  });

  

  return Activity;
};
