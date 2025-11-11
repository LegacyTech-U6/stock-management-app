const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();



let sequelize;


  // Supabase
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
  });


sequelize
  .authenticate()
  .then(() => console.log("✅ Connexion DB réussie !"))
  .catch(err => console.error("❌ Impossible de se connecter :", err));




// Exporter pour utilisation dans les modèles et le serveur
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


// ===============================
// IMPORT MODELS
// ===============================
db.Notification = require("../models/Notification.model")(sequelize, DataTypes);
db.DailyPurchaseReport = require("../models/DailyPurchaseReport.model")(sequelize, DataTypes);
db.Purchase = require("../models/Purchase.model")(sequelize, DataTypes);
db.PurchaseItem = require("../models/PurchaseItem.model")(sequelize, DataTypes);
db.salesReport = require("../models/SalesReport.model")(sequelize, DataTypes);
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
db.CurrencyRate = require("../models/CurrencyRate.model")(sequelize, DataTypes);
db.mailSettings = require("../models/mailSetting.model")(sequelize, DataTypes);
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

// Un utilisateur (admin SaaS) peut créer plusieurs entreprises
db.User.hasMany(db.Entreprise, { as: "entreprises", foreignKey: "user_id" });
db.Entreprise.belongsTo(db.User, {
  foreignKey: "user_id",
  as: "user",
});

// Un utilisateur peut avoir plusieurs travailleurs (employés)
db.User.hasMany(db.Worker, { as: "workers", foreignKey: "user_id" });
db.Worker.belongsTo(db.User, {
  foreignKey: "user_id",
  as: "user",
});

// Un utilisateur peut être lié à plusieurs entreprises (via EntrepriseUsers)
db.User.hasMany(db.entrepriseUsers, {
  as: "entrepriseUsers",
  foreignKey: "user_id",
});
db.entrepriseUsers.belongsTo(db.User, {
  foreignKey: "user_id",
  as: "user",
});

// Un utilisateur peut créer plusieurs factures
db.User.hasMany(db.Invoice, { as: "invoices", foreignKey: "user_id" });
db.Invoice.belongsTo(db.User, {
  foreignKey: "user_id",
  as: "user",
});

// Un utilisateur peut avoir plusieurs activités
db.User.hasMany(db.activities, { as: "activities", foreignKey: "user_id" });
db.activities.belongsTo(db.User, {
  foreignKey: "user_id",
  as: "user",
});

// =======================
// 🏢 ENTREPRISE RELATIONS
// =======================

// Une entreprise appartient à un utilisateur (admin)
db.Entreprise.belongsTo(db.User, { foreignKey: "user_id", as: "owner" });

// Une entreprise peut avoir plusieurs employés (Workers)
db.Entreprise.hasMany(db.Worker, {
  as: "workers",
  foreignKey: "entreprise_id",
});
db.Worker.belongsTo(db.Entreprise, {
  foreignKey: "entreprise_id",
  as: "entreprise",
});

// Une entreprise peut avoir plusieurs utilisateurs internes
db.Entreprise.hasMany(db.entrepriseUsers, {
  as: "entrepriseUsers",
  foreignKey: "entreprise_id",
});
db.entrepriseUsers.belongsTo(db.Entreprise, {
  foreignKey: "entreprise_id",
  as: "entreprise",
});

// Une entreprise peut avoir plusieurs clients
db.Entreprise.hasMany(db.Client, {
  as: "clients",
  foreignKey: "entreprise_id",
});
db.Client.belongsTo(db.Entreprise, {
  foreignKey: "entreprise_id",
  as: "entreprise",
});

// Une entreprise peut avoir plusieurs catégories
db.Entreprise.hasMany(db.Category, {
  as: "categories",
  foreignKey: "entreprise_id",
});
db.Category.belongsTo(db.Entreprise, {
  foreignKey: "entreprise_id",
  as: "entreprise",
});

// Une entreprise peut avoir plusieurs fournisseurs
db.Entreprise.hasMany(db.Supplier, {
  as: "suppliers",
  foreignKey: "entreprise_id",
});
db.Supplier.belongsTo(db.Entreprise, {
  foreignKey: "entreprise_id",
  as: "entreprise",
});

// Une entreprise peut avoir plusieurs produits
db.Entreprise.hasMany(db.Product, {
  as: "products",
  foreignKey: "entreprise_id",
});
db.Product.belongsTo(db.Entreprise, {
  foreignKey: "entreprise_id",
  as: "entreprise",
});

// Une entreprise peut avoir plusieurs factures
db.Entreprise.hasMany(db.Invoice, {
  as: "invoices",
  foreignKey: "entreprise_id",
});
db.Invoice.belongsTo(db.Entreprise, {
  foreignKey: "entreprise_id",
  as: "entreprise",
});

// Une entreprise peut avoir plusieurs ventes
db.Entreprise.hasMany(db.Sales, { as: "sales", foreignKey: "entreprise_id" });
db.Sales.belongsTo(db.Entreprise, {
  foreignKey: "entreprise_id",
  as: "entreprise",
});

// Une entreprise peut avoir plusieurs commandes
db.Entreprise.hasMany(db.Order, { as: "orders", foreignKey: "entreprise_id" });
db.Order.belongsTo(db.Entreprise, {
  foreignKey: "entreprise_id",
  as: "entreprise",
});

// Une entreprise peut avoir plusieurs mouvements de stock
db.Entreprise.hasMany(db.StockMovement, {
  as: "stockMovements",
  foreignKey: "entreprise_id",
});
db.StockMovement.belongsTo(db.Entreprise, {
  foreignKey: "entreprise_id",
  as: "entreprise",
});

// Une entreprise peut avoir plusieurs activités
db.Entreprise.hasMany(db.activities, {
  as: "activities",
  foreignKey: "entreprise_id",
});
db.activities.belongsTo(db.Entreprise, {
  foreignKey: "entreprise_id",
  as: "entreprise",
});

// =======================
// 👨‍💼 WORKER RELATIONS
// =======================
db.roles.hasMany(db.Worker, { as: "workers", foreignKey: "role_id" });
db.Worker.belongsTo(db.roles, { foreignKey: "role_id", as: "role" });

// =======================
// 🧾 FACTURE RELATIONS
// =======================

// Une facture appartient à un client
db.Client.hasMany(db.Invoice, { as: "invoices", foreignKey: "client_id" });
db.Invoice.belongsTo(db.Client, { foreignKey: "client_id", as: "client" });

// Une facture peut contenir plusieurs items
db.Invoice.hasMany(db.InvoiceItem, { as: "items", foreignKey: "facture_id" });
db.InvoiceItem.belongsTo(db.Invoice, {
  foreignKey: "facture_id",
  as: "facture",
});

// Chaque item correspond à un produit
db.Product.hasMany(db.InvoiceItem, {
  as: "invoiceItems",
  foreignKey: "product_id",
});
db.InvoiceItem.belongsTo(db.Product, {
  foreignKey: "product_id",
  as: "product",
});

// =======================
// 🛒 PRODUCT RELATIONS
// =======================

// Produit appartient à une catégorie
db.Category.hasMany(db.Product, { as: "products", foreignKey: "category_id" });
db.Product.belongsTo(db.Category, {
  foreignKey: "category_id",
  as: "category",
});

// Produit appartient à un fournisseur
db.Supplier.hasMany(db.Product, { as: "products", foreignKey: "supplier_id" });
db.Product.belongsTo(db.Supplier, {
  foreignKey: "supplier_id",
  as: "supplierInfo",
});
db.Purchase.hasMany(db.PurchaseItem, {
  as: "items",
  foreignKey: "purchase_id",
  onDelete: "CASCADE",
});
db.PurchaseItem.belongsTo(db.Purchase, {
  foreignKey: "purchase_id",
  as: "purchase",
});

db.PurchaseItem.belongsTo(db.Product, {
  foreignKey: "product_id",
  as: "product",
});
db.Product.hasMany(db.PurchaseItem, {
  as: "purchaseItems",
  foreignKey: "product_id",
});

// Produit peut apparaître dans plusieurs ventes
db.Product.hasMany(db.Sales, { as: "sales", foreignKey: "product_id" });
db.Sales.belongsTo(db.Product, { foreignKey: "product_id", as: "product" });

// Produit peut apparaître dans plusieurs commandes
db.Product.hasMany(db.Order, { as: "orders", foreignKey: "product_id" });
db.Order.belongsTo(db.Product, { foreignKey: "product_id", as: "product" });

// Produit peut avoir plusieurs mouvements de stock
db.Product.hasMany(db.StockMovement, {
  as: "movements",
  foreignKey: "produit_id",
});
db.StockMovement.belongsTo(db.Product, {
  foreignKey: "produit_id",
  as: "product",
});
db.activities.belongsTo(db.Product, {
  foreignKey: "entity_id",
  as: "product",
});

// =======================
// 📦 ORDER RELATIONS
// =======================
db.Supplier.hasMany(db.Order, { as: "orders", foreignKey: "supplier_id" });
db.Order.belongsTo(db.Supplier, {
  foreignKey: "supplier_id",
  as: "supplier",
});

// =======================
// 🔁 STOCK MOVEMENTS
// =======================
db.entrepriseUsers.hasMany(db.StockMovement, {
  as: "movements",
  foreignKey: "created_by",
});
db.StockMovement.belongsTo(db.entrepriseUsers, {
  foreignKey: "created_by",
  as: "createdBy",
});

// =======================
// ⚙️ SETTINGS RELATIONS
// =======================
db.Entreprise.hasOne(db.Setting, {
  as: "setting",
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
