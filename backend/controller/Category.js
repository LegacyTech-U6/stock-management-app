// controllers/categoryController.js
//Here we import the categories function and queries received from the model/categoryConfig
const categoryModel = require("../models/categoryConfig");
module.exports = {
  getCategories: async (req, res) => {
    try {
      const categories = await categoryModel.getAllCategories();
      res.json(categories);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },

  getCategory: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const category = await categoryModel.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },

  createCategory: async (req, res) => {
    try {
      const { name, description } = req.body;
      if (!name) {
        return res.status(400).json({ message: "Category name is required" });
      }
      const newCategoryId = await categoryModel.createCategory(
        name,
        description
      );
      res.status(201).json({ message: "Category added successfully", id: newCategoryId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { name, description } = req.body;
      if (!name) {
        return res.status(400).json({ message: "Category name is required" });
      }
      const affectedRows = await categoryModel.updateCategory(
        id,
        name,
        description
      );
      if (affectedRows === 0) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(201).json({ message: "category updated", affectedRows });
    } catch (err) {
      console.err(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },
  
  deleteCategory: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const supprimer = await categoryModel.deleteCategory(id);
      if (supprimer === 0) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(201).json({ message: "category deleted", supprimer });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },

};
