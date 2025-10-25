const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Product = sequelize.define("Product", {
    Prod_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      unique: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    cost_price: DataTypes.INTEGER,
    selling_price: DataTypes.INTEGER,
    Prod_Description: DataTypes.TEXT,
    code_bar: DataTypes.STRING,
    date_of_arrival: DataTypes.DATE,
    Prod_image: DataTypes.STRING,
    min_stock_level: { type: DataTypes.INTEGER, defaultValue: 0 },
    max_stock_level: DataTypes.INTEGER,
  });
  return Product;
};
