const express = require("express");
const cors = require("cors");
const  path= require ("path");
const app = express();
const db = require('./src/config/db')
// 🕐 Charger le cron des rapports journaliers
require('./src/crons/dailyReports')
const purchaseRoutes = require('./src/routes/purchase.route')
const ProductRoute = require("./src/routes/product.route");
const ProductRouteStats = require("./src/routes/stats");
const CategoryRoute = require("./src/routes/category.route");
const SupplierRoute = require("./src/routes/supplier.route");
const OrderRoute = require("./src/routes/order.route");
const factureRoutes = require("./src/routes/facture.route");
const clientRoute = require("./src/routes/client.route");
const user = require("./src/routes/Auths.route");
const entreprise = require("./src/routes/entreprise.routes");
const workers = require("./src/routes/workers.routes")
const rolesRoutes = require("./src/routes/roles.routes")
const activityRoutes = require("./src/routes/activity.routes");
// Database
 // ton index.js Sequelize
const Role = db.Role;

// 🔹 Rôles prédéfinis
const predefinedRoles = [
  { name: 'Admin', description: 'Full access to all system features and settings' },
  { name: 'StockManager', description: 'Manages stock, products, and inventory' },
  { name: 'SalesPoint', description: 'Handles sales at points of sale' },
];

async function seedPredefinedRoles() {
  const countRoles = await Role.count();
  if (countRoles === 0) {
    for (const role of predefinedRoles) {
      await Role.create(role);
      console.log(`Role "${role.name}" created ✅`);
    }
  }
}
// ⚠️ ATTENTION: supprime les données existantes en dev
db.sequelize.sync({force: true }).then(async () => {
  console.log("✅ Toutes les tables ont été créées !");

  try {
    await seedPredefinedRoles();
  } catch (err) {
    console.error("Error seeding predefined roles:", err);
  }
});
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.url}`);
  next();
});
app.use(
  cors({
    origin: "http://localhost:5173", // ou "*" pour tout autoriser (déconseillé en prod)
    credentials: true,
  })
);


app.use("/api/activities", activityRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/purchase" ,purchaseRoutes);
app.use("/api/products", ProductRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/stats", ProductRouteStats);
app.use("/api/suppliers", SupplierRoute);
app.use("/api/orders", OrderRoute);
app.use("/api/factures", factureRoutes);
app.use("/api/client", clientRoute);
app.use("/api/auth", user);
app.use("/api/entreprises", entreprise);
app.use("/api/workers",workers);
app.use("/api/roles", rolesRoutes)

module.exports = app;
