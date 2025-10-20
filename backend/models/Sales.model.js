// models/Sales.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Sales = sequelize.define('Sales', {
    quantity_sold: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    total_profit: {
      type: DataTypes.DECIMAL(22, 2),
      allowNull: false,
    },
    sale_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  

  return Sales;
};
