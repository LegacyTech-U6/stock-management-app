const express = require("express");
const router = express.Router();
const {CategoryController, getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory} = require("../controller/category.controller");
const getActiveEntreprise = require('../middleware/activeEntreprise');

router.use(getActiveEntreprise);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id",deleteCategory);


module.exports = router;
