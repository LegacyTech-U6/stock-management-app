const express = require('express');
const router = express.Router();
const ProductControllerStats = require("../controller/statistics/productStats");

// Define routes for product operations
router.get('/sales-stats', ProductControllerStats.productSales);
router.get('/sales-report', ProductControllerStats.getSalesReport);

module.exports = router;