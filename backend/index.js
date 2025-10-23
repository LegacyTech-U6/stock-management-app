const express = require("express");
const cors = require("cors");
const  path= require ("path");
const app = express();
const db = require('./src/config/db')
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
// ⚠️ ATTENTION: supprime les données existantes en dev
db.sequelize.sync().then(() => {
  console.log("✅ Toutes les tables ont été créées !");
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
