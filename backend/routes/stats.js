const express = require('express');
const router = express.Router();
const ProductControllerStats = require("../controller/statistics/productStats");
const getActiveEntreprise = require('../middleware/activeEntreprise');
// Define routes for product operations
router.get('/sales-stats', getActiveEntreprise, ProductControllerStats.productSales);
router.get('/sales-report', getActiveEntreprise, ProductControllerStats.getSalesReport);
router.get('/best-category', getActiveEntreprise, ProductControllerStats.getBestCategory);
router.get('/best-category/:id', getActiveEntreprise, ProductControllerStats.getBestByCategory);
module.exports = router;