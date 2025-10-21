const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Worker = sequelize.define('Worker', {
    image: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    email: {
      type: DataTypes.STRING(150),
      unique: true,
    },
    name: DataTypes.STRING,
    position: DataTypes.STRING,
    date_hired: DataTypes.DATE,
    password_hash: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'suspended'),
      defaultValue: 'inactive',
    },
  }, {
    timestamps: true,
    createdAt: 'created_at',
  });
  return Worker;
};
