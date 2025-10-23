require('dotenv').config(); // charge les variables du .env

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: "ton_mot_de_passe",
    database: "test_db",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: "ton_mot_de_passe",
    database: "prod_db",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
