// models/Supplier.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Supplier = sequelize.define('Supplier', {
    supplier_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    supplier_address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    email: DataTypes.STRING,
    whatsapp_number: DataTypes.STRING,
    preferred_channel: {
      type: DataTypes.ENUM('email', 'whatsapp', 'phone'),
      defaultValue: 'email',
    },
  });



  return Supplier;
};
