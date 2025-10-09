const express = require("express");
const router = express.Router();
const categoryController = require("../controller/Category");
const getActiveEntreprise = require('../middleware/activeEntreprise');

router.use(getActiveEntreprise);
router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategory);
router.post("/", categoryController.createCategory);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id",categoryController.deleteCategory);


module.exports = router;
