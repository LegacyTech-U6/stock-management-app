const express = require('express');
const router = express.Router();
const ProductController = require("../controller/Produits");
const validateProduct = require("../middleware/validateProduct");
const upload = require("../middleware/upload");
const getActiveEntreprise = require('../middleware/activeEntreprise');
// Product routes
router.use(getActiveEntreprise);
router.post('/', ProductController.post);
router.get('/', ProductController.get);
router.get('/low-stock', ProductController.checkLowStockGlobal);
router.get('/out-of-stock', ProductController.checkOutOfStockGlobal);
router.get('/sales', ProductController.getsales);
router.get("/:id", ProductController.get2);
router.get('/category/:categoryId', ProductController.getProductsByCategory);

router.post("/buy", ProductController.buyProduct);
router.post("/add/", upload.single("prod_image"), ProductController.addProduct);

// ✅ allow updating product with optional new image
router.put("/:id", upload.single("prod_image"), ProductController.updated);

router.delete("/:id", ProductController.delete);

module.exports = router;
