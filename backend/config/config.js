require('dotenv').config(); // charge les variables du .env

module.exports = {
  development: {
    username: process.env.MYSQL_USER_local || "root",
    password: process.env.MYSQL_PASSWORD_local || "",
    database: process.env.MYSQL_DATABASE_local || "dev_db",
    host: process.env.MYSQL_HOST_local || "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "test_db",
    host: process.env.MYSQL_HOST || "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST, // Railway ou autre host fourni par ton provider
    port: process.env.MYSQL_PORT || 3306,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false // nécessaire si Railway active SSL
      }
    }
  },
};
