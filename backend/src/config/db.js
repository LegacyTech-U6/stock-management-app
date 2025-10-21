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
const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    logging: false,
  }
);

// Vérification de la connexion
sequelize
  .authenticate()
  .then(() => console.log("✅ Connecté à MySQL !"))
  .catch((err) => console.error("❌ Erreur de connexion à MySQL :", err));

// Initialisation des modèles
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
// ===============================
// IMPORT MODELS
// ===============================
db.User = require("../models/user.model")(sequelize, DataTypes);
db.Product = require("../models/product.model")(sequelize, DataTypes);
db.Worker = require("../models/worker.model")(sequelize, DataTypes);
db.Category = require("../models/category.model")(sequelize, DataTypes);
db.Client = require("../models/client.model")(sequelize, DataTypes);
db.Supplier = require("../models/supplier.model")(sequelize, DataTypes);
db.Invoice = require("../models/invoice.model")(sequelize, DataTypes);
db.InvoiceItem = require("../models/invoiceItem.model")(sequelize, DataTypes);
db.Sales = require("../models/Sales.model")(sequelize, DataTypes);
db.Order = require("../models/order.model")(sequelize, DataTypes);
db.StockMovement = require("../models/StockMovement.model")(
  sequelize,
  DataTypes
);
db.Setting = require("../models/setting.model")(sequelize, DataTypes);
db.activities = require("../models/activity.model")(sequelize, DataTypes);
db.Entreprise = require("../models/enterprise.model")(sequelize, DataTypes);
db.entrepriseUsers = require("../models/entrepriseUser.model")(
  sequelize,
  DataTypes
);
db.roles = require("../models/role.model")(sequelize, DataTypes);
db.rolePermissions = require("../models/rolePermission.model")(
  sequelize,
  DataTypes
);
db.permissions = require("../models/permission.model")(sequelize, DataTypes);
// =============================================================
// 🔗 RELATIONS ENTRE LES MODÈLES (Stockly)
// =============================================================

// =======================
// 👤 USER RELATIONS
// =======================

// Un utilisateur (admin SaaS) peut créer plusieurs Entreprise
db.User.hasMany(db.Entreprise, { as: "Entreprise" });
db.Entreprise.belongsTo(db.User, {
  foreignKey: {
    name: "user_id",
    type: DataTypes.UUID, // 🔑 Important
  },
  as: "user",
});

// Un utilisateur peut avoir plusieurs travailleurs (employés)
db.User.hasMany(db.Worker, { as: "Worker" });
db.Worker.belongsTo(db.User, {
  foreignKey: {
    name: "user_id",
    type: DataTypes.UUID, // 🔑 Important
  },
  as: "user",
});

// Un utilisateur peut être lié à plusieurs Entreprise (via EntrepriseUsers)
db.User.hasMany(db.entrepriseUsers, { as: "entrepriseUsers" });
db.entrepriseUsers.belongsTo(db.User, {
  foreignKey: {
    name: "user_id",
    type: DataTypes.UUID, // 🔑 Important
  },
  as: "user",
});

// Un utilisateur peut créer plusieurs Invoice
db.User.hasMany(db.Invoice, { as: "Invoice" });
db.Invoice.belongsTo(db.User, {
  foreignKey: {
    name: "user_id",
    type: DataTypes.UUID, // 🔑 Important
  },
  as: "user",
});

// User → Activity
db.User.hasMany(db.activities, { 
  as: "activities",
  foreignKey: { name: "user_id", type: DataTypes.UUID }
});
db.activities.belongsTo(db.User, {
  foreignKey: { name: "user_id", type: DataTypes.UUID },
  as: "user"
});
// =======================
// 🏢 ENTREPRISE RELATIONS
// =======================

// Une entreprise appartient à un utilisateur (admin)
db.Entreprise.belongsTo(db.User, { foreignKey: "user_id", as: "owner" });

// Une entreprise peut avoir plusieurs employés (Workers)
db.Entreprise.hasMany(db.Worker, { as: "Worker" });
db.Worker.belongsTo(db.Entreprise, {
  foreignKey: "entreprise_id",
  as: "entreprise",
});

// Une entreprise peut avoir plusieurs utilisateurs internes (EntrepriseUsers)
db.Entreprise.hasMany(db.entrepriseUsers, { as: "entrepriseUsers" });
db.entrepriseUsers.belongsTo(db.Entreprise, {
  foreignKey: "entreprise_id",
  as: "entreprise",
});

// Une entreprise peut avoir plusieurs Client
db.Entreprise.hasMany(db.Client, { as: "Client" });
db.Client.belongsTo(db.Entreprise, {
  foreignKey: "entreprise_id",
  as: "entreprise",
});

// Une entreprise peut avoir plusieurs catégories
db.Entreprise.hasMany(db.Category, { as: "Category" });
db.Category.belongsTo(db.Entreprise, {
  foreignKey: "entreprise_id",
  as: "entreprise",
});

// Une entreprise peut avoir plusieurs fournisseurs
db.Entreprise.hasMany(db.Supplier, { as: "Supplier" });
db.Supplier.belongsTo(db.Entreprise, {
  foreignKey: "entreprise_id",
  as: "entreprise",
});

// Une entreprise peut avoir plusieurs produits
db.Entreprise.hasMany(db.Product, { as: "Product" });
db.Product.belongsTo(db.Entreprise, {
  foreignKey: "entreprise_id",
  as: "entreprise",
});

// Une entreprise peut avoir plusieurs Invoice
db.Entreprise.hasMany(db.Invoice, { as: "Invoice" });
db.Invoice.belongsTo(db.Entreprise, {
  foreignKey: "entreprise_id",
  as: "entreprise",
});

// Une entreprise peut avoir plusieurs ventes
db.Entreprise.hasMany(db.Sales, { as: "Sales" });
db.Sales.belongsTo(db.Entreprise, {
  foreignKey: "entreprise_id",
  as: "entreprise",
});

// Une entreprise peut avoir plusieurs commandes
db.Entreprise.hasMany(db.Order, { as: "Order" });
db.Order.belongsTo(db.Entreprise, {
  foreignKey: "entreprise_id",
  as: "entreprise",
});

// Une entreprise peut avoir plusieurs mouvements de stock
db.Entreprise.hasMany(db.StockMovement, { as: "mouvements_stock" });
db.StockMovement.belongsTo(db.Entreprise, {
  foreignKey: "entreprise_id",
  as: "entreprise",
});

// Une entreprise peut avoir plusieurs activités
db.Entreprise.hasMany(db.activities, { as: "activities" });
db.activities.belongsTo(db.Entreprise, {
  foreignKey: "entreprise_id",
  as: "entreprise",
});

// =======================
// 👨‍💼 WORKER RELATIONS
// =======================
db.roles.hasMany(db.Worker, { as: "Worker" });
db.Worker.belongsTo(db.roles, { foreignKey: "role_id", as: "role" });

// =======================
// 🧾 FACTURE RELATIONS
// =======================

// Une facture appartient à un client
db.Client.hasMany(db.Invoice, { as: "Invoice" });
db.Invoice.belongsTo(db.Client, { foreignKey: "client_id", as: "client" });

// Une facture peut contenir plusieurs items
db.Invoice.hasMany(db.InvoiceItem, { as: "items" });
db.InvoiceItem.belongsTo(db.Invoice, {
  foreignKey: "facture_id",
  as: "facture",
});

// Chaque item correspond à un produit
db.Product.hasMany(db.InvoiceItem, { as: "InvoiceItem" });
db.InvoiceItem.belongsTo(db.Product, {
  foreignKey: "product_id",
  as: "product",
});

// =======================
// 🛒 PRODUCT RELATIONS
// =======================
db.Category.hasMany(db.Product, { as: "Product" });
db.Product.belongsTo(db.Category, {
  foreignKey: "category_id",
  as: "category",
});

db.Supplier.hasMany(db.Product, { as: "Product" });
db.Product.belongsTo(db.Supplier, {
  foreignKey: "supplier",
  as: "supplierInfo",
});

// Produits et ventes
db.Product.hasMany(db.Sales, { as: "Sales" });
db.Sales.belongsTo(db.Product, { foreignKey: "product_id", as: "product" });

// Produits et commandes
db.Product.hasMany(db.Order, { as: "Order" });
db.Order.belongsTo(db.Product, { foreignKey: "product_id", as: "product" });

// Produits et mouvements de stock
db.Product.hasMany(db.StockMovement, { as: "movements" });
db.StockMovement.belongsTo(db.Product, {
  foreignKey: "produit_id",
  as: "product",
});

// =======================
// 📦 ORDER RELATIONS
// =======================
db.Supplier.hasMany(db.Order, { as: "Order" });
db.Order.belongsTo(db.Supplier, {
  foreignKey: "supplier_id",
  as: "supplier",
});

// =======================
// 🔁 STOCK MOVEMENTS
// =======================

// Mouvements créés par un utilisateur interne à l’entreprise
db.entrepriseUsers.hasMany(db.StockMovement, { as: "movements" });
db.StockMovement.belongsTo(db.entrepriseUsers, {
  foreignKey: "created_by",
  as: "createdBy",
});

// =======================
// ⚙️ SETTINGS RELATIONS
// =======================
db.Entreprise.hasOne(db.Setting, {
  as: "Setting",
  foreignKey: "entreprise_id",
});
db.Setting.belongsTo(db.Entreprise, {
  foreignKey: "entreprise_id",
  as: "entreprise",
});

// =======================
// 🧱 ROLE / PERMISSION RELATIONS
// =======================
db.roles.belongsToMany(db.permissions, {
  through: db.rolePermissions,
  foreignKey: "role_id",
  as: "permissions",
});
db.permissions.belongsToMany(db.roles, {
  through: db.rolePermissions,
  foreignKey: "permission_id",
  as: "roles",
});

// ===============================
// EXPORT
// ===============================
module.exports = db;
