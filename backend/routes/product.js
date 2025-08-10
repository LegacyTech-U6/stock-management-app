const express = require('express')
const router = express.Router()
const ProductController= require("../controller/Produits")
// router.get("/",ProductController.get);
router.post('/',ProductController.post)
router.get('/',ProductController.get)
router.get("/:id",ProductController.get2)
router.get('/category/:categoryId',ProductController.getProductsByCategory)
router.post("/buy", ProductController.buyProduct)
router.post("/add",ProductController.addProduct)
router.put("/:id",ProductController.updated)
router.delete("/:id",ProductController.delete)
module.exports = router