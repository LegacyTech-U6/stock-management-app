const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    Prod_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    cost_price: {
      type: DataTypes.DECIMAL(10, 3), // ✅ pour 2 chiffres après la virgule
      allowNull: false,
    },
    selling_price: {
      type: DataTypes.DECIMAL(10, 3), // ✅ idem ici
      allowNull: false,
    },
    Prod_Description: {
      type: DataTypes.TEXT,
    },
    code_bar: {
      type: DataTypes.STRING,
    },
    date_of_arrival: {
      type: DataTypes.DATE,
    },
    Prod_image: {
      type: DataTypes.STRING,
    },
    min_stock_level: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    max_stock_level: {
      type: DataTypes.INTEGER,
    },
    entreprise_id: {
      type: DataTypes.UUID,
    },
    category_id: {
      type: DataTypes.UUID,
    }
  }, {
    tableName: 'Products',   // 👈 Forcer la majuscule dans la BDD
    freezeTableName: true,   // 👈 Empêche Sequelize de changer le nom automatiquement
    timestamps: true,        // 👈 Active createdAt / updatedAt
  });

  return Product;
};
