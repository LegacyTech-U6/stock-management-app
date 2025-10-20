// backend/models/index.js
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE2,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    logging: true
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('✅ Connecté à la base de données MySQL avec Sequelize !');
  })
  .catch(err => {
    console.error('❌ Impossible de se connecter à la base de données :', err);
  });

// Example model

const User = require('./users/User')(sequelize,DataTypes);

module.exports = {
  sequelize,
  User,
};
