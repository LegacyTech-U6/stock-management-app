const express = require('express');
const router = express.Router();
const ProductController = require("../controller/Produits");
const validateProduct = require("../middleware/validateProduct");
const upload = require("../middleware/upload");
const getActiveEntreprise = require('../middleware/activeEntreprise');
// Product routes
router.post('/', getActiveEntreprise, ProductController.post);
router.get('/', getActiveEntreprise, ProductController.get);
router.get('/low-stock', getActiveEntreprise, ProductController.checkLowStockGlobal);
router.get('/out-of-stock', getActiveEntreprise, ProductController.checkOutOfStockGlobal);
router.get('/sales', getActiveEntreprise, ProductController.getsales);
router.get("/:id", getActiveEntreprise, ProductController.get2);
router.get('/category/:categoryId', getActiveEntreprise, ProductController.getProductsByCategory);

router.post("/buy", getActiveEntreprise, ProductController.buyProduct);
router.post("/add/", getActiveEntreprise, upload.single("prod_image"), ProductController.addProduct);

// ✅ allow updating product with optional new image
router.put("/:id", getActiveEntreprise, upload.single("prod_image"), ProductController.updated);

router.delete("/:id", getActiveEntreprise, ProductController.delete);

module.exports = router;
