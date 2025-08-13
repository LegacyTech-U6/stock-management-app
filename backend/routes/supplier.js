const express = require("express");
const router = express.Router();
const {
  get,
  getOne,
  modifySupplier,
  delete: deleteSupplier,
  getProducts,
  addSupplier: createSupplier,
} = require("../controller/suppliers");

router.get("/", get);
router.post("/", createSupplier);
router.get("/:id", getOne);
router.put("/:id", modifySupplier);
router.delete("/:id", deleteSupplier);
router.get("/:id/products", getProducts);

module.exports = router;
