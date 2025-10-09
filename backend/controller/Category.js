// controllers/categoryController.js
const categoryModel = require("../models/categoryConfig");

module.exports = {
  getCategories: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId; // récupéré depuis ton middleware
      const categories = await categoryModel.getAllCategories(entrepriseId);
      res.json(categories);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },

  getCategory: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const entrepriseId = req.entrepriseId;
      const category = await categoryModel.getCategoryById(id, entrepriseId);
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
      const entrepriseId = req.entrepriseId;
      if (!name) {
        return res.status(400).json({ message: "Category name is required" });
      }
      const newCategoryId = await categoryModel.createCategory(
        name,
        entrepriseId,
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
      const entrepriseId = req.entrepriseId;
      if (!name) {
        return res.status(400).json({ message: "Category name is required" });
      }
      const affectedRows = await categoryModel.updateCategory(
        id,
        name,
        entrepriseId,
        description
      );
      if (affectedRows === 0) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(201).json({ message: "Category updated", affectedRows });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },
  
  deleteCategory: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const entrepriseId = req.entrepriseId;
      const supprimer = await categoryModel.deleteCategory(id, entrepriseId);
      if (supprimer === 0) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(201).json({ message: "Category deleted", supprimer });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },
};
