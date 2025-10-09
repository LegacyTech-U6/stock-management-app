const express = require("express");
const router = express.Router();
const  validateSupplier  = require("../middleware/validateSupllier"); 
const {
  get,
  getOne,
  modifySupplier,
  delete: deleteSupplier,
  getProducts,
  addSupplier: createSupplier,
} = require("../controller/suppliers");
const getActiveEntreprise = require('../middleware/activeEntreprise');
router.get("/",getActiveEntreprise, get);
router.post("/", getActiveEntreprise,validateSupplier, createSupplier);
router.get("/:id",getActiveEntreprise, getOne);
router.put("/:id", getActiveEntreprise, modifySupplier);
router.delete("/:id", getActiveEntreprise, deleteSupplier);
router.get("/:id/products", getActiveEntreprise, getProducts);

module.exports = router;
