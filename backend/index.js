const express = require("express");
const cors = require("cors");
const  path= require ("path");
const app = express();

const ProductRoute = require("./routes/product");
const ProductRouteStats = require("./routes/stats");
const CategoryRoute = require("./routes/category");
const SupplierRoute = require("./routes/supplier");
const OrderRoute = require("./routes/Order");
const factureRoutes = require("./routes/facture");
const clientRoute = require("./routes/client");
const user = require("./routes/Auths.route");
const entreprise = require("./routes/entreprise.routes");
const workers = require("./routes/workers.routes")
const rolesRoutes = require("./routes/roles.routes")
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
