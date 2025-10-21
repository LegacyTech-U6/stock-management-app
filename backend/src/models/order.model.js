// models/Order.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM('pending', 'sent', 'delivered'),
      defaultValue: 'pending',
    },
    updated_at: DataTypes.DATE,
  });

  

  return Order;
};
