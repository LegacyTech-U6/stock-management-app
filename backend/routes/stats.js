const express = require("express");
const router = express.Router();
const statsController = require("../controller/statistics/productStats");

/**
 * ============================================================
 * 📊 STATISTICS ROUTES
 * ------------------------------------------------------------
 * All routes related to analytics, KPIs, revenue, profit, and trends.
 * Base path: /api/stats
 * ============================================================
 */

// Product-level stats
router.get("/product-sales", statsController.productSales);
router.get("/sales-report", statsController.getSalesReport);
router.get("/best-selling", statsController.getBestSellingProduct);

// Category-level stats
router.get("/best-category", statsController.getBestCategory);
router.get("/best-by-category/:id", statsController.getBestByCategory);

// Financial stats
router.get("/revenue", statsController.getRevenue);
router.get("/profit", statsController.getProfit);
router.get("/compare-sales", statsController.compareSales);

// Trend and seasonal analysis
router.get("/quarterly-sales", statsController.getQuarterlySales);
router.get("/sales-trend", statsController.getSalesTrend);

module.exports = router;
