const express = require('express');
const router = express.Router();
const ProductControllerStats = require("../controller/statistics/productStats");

// Define routes for product operations
router.get('/sales-stats', ProductControllerStats.productSales);
router.get('/sales-report', ProductControllerStats.getSalesReport);
router.get('/best-category', ProductControllerStats.getBestCategory);
router.get('/best-category/:id', ProductControllerStats.getBestByCategory);
module.exports = router;