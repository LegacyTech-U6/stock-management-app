// models/Client.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Client = sequelize.define('Client', {
    client_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    client_Signature: {
      type: DataTypes.STRING,
    },
    client_PhoneNumber: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
    },
  });


  return Client;
};
