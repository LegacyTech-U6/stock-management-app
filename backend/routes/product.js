const express = require('express')
const router = express.Router()
const ProductController= require("../controller/Produits")
router.get("/",ProductController.get);
router.post('/',ProductController.post)
module.exports = router