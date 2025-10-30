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
      allowNull: true,
    },
    client_PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
      allowNull: true,
    },
    image:{
      type:DataTypes.STRING,
      allowNull: true,
    }
  });


  return Client;
};
