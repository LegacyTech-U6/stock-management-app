// models/StockMovement.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const StockMovement = sequelize.define('StockMovement', {
    type: {
      type: DataTypes.ENUM('entrée', 'sortie'),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  

  return StockMovement;
};
