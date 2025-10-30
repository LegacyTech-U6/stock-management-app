const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "AllUser",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      password_hash: DataTypes.STRING,
      type: DataTypes.STRING, // 'admin' ou 'worker'
    },
    {
      tableName: "all_users",
      timestamps: false,
      freezeTableName: true,
    }
  );
};
