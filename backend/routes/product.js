const express = require('express')
const router = express.Router()
const ProductController= require("../controller/Produits")
const validateProduct = require("../middleware/validateProduct")
// router.get("/",ProductController.get);
router.post('/',validateProduct,ProductController.post)
router.get('/',ProductController.get)
router.get('/low-stock', ProductController.checkLowStockGlobal);
router.get('/out-of-stock', ProductController.checkOutOfStockGlobal);
router.get('/sales', ProductController.getsales);
router.get("/:id",ProductController.get2)
router.get('/category/:categoryId',ProductController.getProductsByCategory)



router.post("/buy", ProductController.buyProduct)
router.post("/add",ProductController.addProduct)
router.put("/:id",ProductController.updated)
router.delete("/:id",ProductController.delete)
module.exports = router