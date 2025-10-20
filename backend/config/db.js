const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
  .promise();

console.log("✅ Connecté à MySQL !");

module.exports = { pool };
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

const db = {};
db.sequelize = sequelize;

// ===============================
// IMPORT MODELS
// ===============================
db.User = require('../models/user.model')(sequelize);
db.Product = require('../models/product.model')(sequelize);
db.Worker = require('../models/worker.model')(sequelize);
db.Category = require('../models/category.model')(sequelize);
db.Client = require('../models/client.model')(sequelize);
db.Supplier = require('../models/supplier.model')(sequelize);
db.Invoice = require('../models/invoice.model')(sequelize);
db.InvoiceItem = require('../models/invoiceItem.model')(sequelize);
db.Sales = require('../models/Sales.model')(sequelize);
db.Order = require('../models/order.model')(sequelize);
db.StockMovement = require('../models/StockMovement.model')(sequelize);
db.Settings = require('../models/setting.model')(sequelize);
db.Activity = require('../models/activity.model')(sequelize);
db.Entreprise = require('../models/enterprise.model')(sequelize);

// ===============================
// DEFINE RELATIONSHIPS
// ===============================

// 🔹 Entreprise 1 - N Users
db.Entreprise.hasMany(db.User, { foreignKey: 'entreprise_id' });
db.User.belongsTo(db.Entreprise, { foreignKey: 'entreprise_id' });

// 🔹 Entreprise 1 - N Products
db.Entreprise.hasMany(db.Product, { foreignKey: 'entreprise_id' });
db.Product.belongsTo(db.Entreprise, { foreignKey: 'entreprise_id' });

// 🔹 Category 1 - N Products
db.Category.hasMany(db.Product, { foreignKey: 'category_id' });
db.Product.belongsTo(db.Category, { foreignKey: 'category_id' });

// 🔹 Entreprise 1 - N Clients
db.Entreprise.hasMany(db.Client, { foreignKey: 'entreprise_id' });
db.Client.belongsTo(db.Entreprise, { foreignKey: 'entreprise_id' });

// 🔹 Entreprise 1 - N Suppliers
db.Entreprise.hasMany(db.Supplier, { foreignKey: 'entreprise_id' });
db.Supplier.belongsTo(db.Entreprise, { foreignKey: 'entreprise_id' });

// 🔹 Client 1 - N Invoices
db.Client.hasMany(db.Invoice, { foreignKey: 'client_id' });
db.Invoice.belongsTo(db.Client, { foreignKey: 'client_id' });

// 🔹 Invoice 1 - N InvoiceItems
db.Invoice.hasMany(db.InvoiceItem, { foreignKey: 'invoice_id' });
db.InvoiceItem.belongsTo(db.Invoice, { foreignKey: 'invoice_id' });

// 🔹 Product 1 - N InvoiceItems
db.Product.hasMany(db.InvoiceItem, { foreignKey: 'product_id' });
db.InvoiceItem.belongsTo(db.Product, { foreignKey: 'product_id' });

// 🔹 Entreprise 1 - N Sales
db.Entreprise.hasMany(db.Sale, { foreignKey: 'entreprise_id' });
db.Sale.belongsTo(db.Entreprise, { foreignKey: 'entreprise_id' });

// 🔹 Sale 1 - N Products (through a join table if needed)
db.Sale.belongsToMany(db.Product, { through: 'SaleProducts', foreignKey: 'sale_id' });
db.Product.belongsToMany(db.Sale, { through: 'SaleProducts', foreignKey: 'product_id' });

// 🔹 Entreprise 1 - N Orders
db.Entreprise.hasMany(db.Order, { foreignKey: 'entreprise_id' });
db.Order.belongsTo(db.Entreprise, { foreignKey: 'entreprise_id' });

// 🔹 Supplier 1 - N Orders
db.Supplier.hasMany(db.Order, { foreignKey: 'supplier_id' });
db.Order.belongsTo(db.Supplier, { foreignKey: 'supplier_id' });

// 🔹 Order 1 - N StockMovements
db.Order.hasMany(db.StockMovement, { foreignKey: 'order_id' });
db.StockMovement.belongsTo(db.Order, { foreignKey: 'order_id' });

// 🔹 Product 1 - N StockMovements
db.Product.hasMany(db.StockMovement, { foreignKey: 'product_id' });
db.StockMovement.belongsTo(db.Product, { foreignKey: 'product_id' });

// 🔹 Entreprise 1 - N Settings
db.Entreprise.hasMany(db.Setting, { foreignKey: 'entreprise_id' });
db.Setting.belongsTo(db.Entreprise, { foreignKey: 'entreprise_id' });

// 🔹 Entreprise 1 - N Activities
db.Entreprise.hasMany(db.Activity, { foreignKey: 'entreprise_id' });
db.Activity.belongsTo(db.Entreprise, { foreignKey: 'entreprise_id' });

// 🔹 User 1 - N Activities (for tracking who did what)
db.User.hasMany(db.Activity, { foreignKey: 'user_id' });
db.Activity.belongsTo(db.User, { foreignKey: 'user_id' });

// ===============================
// EXPORT
// ===============================
module.exports = db;