const express = require("express");
const cors = require("cors");

const app = express();
const userRoutes = require("./routes/user");
const ProductRoute = require("./routes/product");
const ProductRouteStats = require("./routes/stats");
const CategoryRoute = require("./routes/category");
const SupplierRoute = require("./routes/supplier");
const OrderRoute = require("./routes/Order");
const factureRoutes = require("./routes/facture");
const clientRoute = require("./routes/client");
const user = require("./routes/Auths.route");
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.url}`);
  next();
});
app.use(
  cors({
    origin: "http://localhost:5174" , // ou "*" pour tout autoriser (déconseillé en prod)
    credentials: true,
  })
);

app.use("/app", userRoutes);
app.use("/api/products", ProductRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/stats", ProductRouteStats);
app.use("/api/suppliers", SupplierRoute);
app.use("/api/orders", OrderRoute);
app.use("/api/factures", factureRoutes);
app.use("/api/client", clientRoute);
app.use("/api/auth", user);

module.exports = app;
