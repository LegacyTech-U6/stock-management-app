const express = require("express");
const router = express.Router();

const authenticateUser = require("../middleware/AuthenticatedUser");
const getActiveEntreprise = require("../middleware/activeEntreprise");

const statsController = require("../controller/statistics/productStats");

// 🌐 Tous les endpoints passent par les deux middlewares
// - authenticateUser : garantit que l'utilisateur est connecté
// - getActiveEntreprise : fournit req.entrepriseId si header X-Entreprise-Id présent
router.use(authenticateUser);
router.use(getActiveEntreprise);

// ----------------------------
// STATISTICS ROUTES
// ----------------------------
router.get("/product-sales", statsController.productSales);
router.get("/sales-report", statsController.getSalesReport);
router.get("/best-category", statsController.getBestCategory);
router.get("/best-by-category/:id", statsController.getBestByCategory);
router.get("/best-selling", statsController.getBestSellingProduct);
router.get("/revenue", statsController.getRevenue);
router.get("/profit", statsController.getProfit);
router.get("/compare-sales", statsController.compareSales);
router.get("/quarterly-sales", statsController.getQuarterlySales);
router.get("/sales-trend", statsController.getSalesTrend);
router.get("/revenue-by-category", statsController.getRevenueByCategory);
router.get(
  "/products/distribution-by-category", statsController.getProductDistributionByCategory
);
module.exports = router;
