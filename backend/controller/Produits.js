const {
  getProduct,
  createProduct,
  getOneProduct,
  deleteProduct,
  updateProduct,
  updateProductQuantity,
  createSale,
  getProductsByCategoryId,
  getLowStockProductsGlobal,
  checkLowStock,
  getOutOfStockProducts,
  getSales,
} = require("../models/dbConfig");
const fs = require("fs");
const path = require("path");
const { createOrder } = require("../models/Orders");
const { getOnesupplier } = require("../models/Suppliers");

module.exports = {
  // --- Récupérer tous les produits ---
  get: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const products_Data = await getProduct(entrepriseId);
      res.json(products_Data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  // --- Récupérer un produit ---
  get2: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const id = parseInt(req.params.id);
      const product_Data = await getOneProduct(id, entrepriseId);
      if (!product_Data) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product_Data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  // --- Ajouter de la quantité à un produit existant ---
  addProduct: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const { productId, quantityAdd } = req.body;

      if (!productId || !quantityAdd || quantityAdd <= 0) {
        return res.status(400).json({ message: "Invalid product ID or quantity" });
      }

      const product = await getOneProduct(productId, entrepriseId);
      if (!product) return res.status(404).json({ message: "Product not found" });

      const newQuantity = product.quantity + quantityAdd;
      await updateProductQuantity(productId, newQuantity, entrepriseId);

      res.status(200).json({
        message: "Quantity added successfully",
        product: { ...product, quantity: newQuantity },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  // --- Acheter un produit (création de vente) ---
  buyProduct: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const { productId, quantitySold } = req.body;

      if (!productId || !quantitySold || quantitySold <= 0) {
        return res.status(400).json({ message: "Invalid product ID or quantity" });
      }

      const product = await getOneProduct(productId, entrepriseId);
      if (!product) return res.status(404).json({ message: "Product not found" });

      if (product.quantity < quantitySold) {
        return res.status(400).json({ message: "Not enough stock available" });
      }

      const newQuantity = product.quantity - quantitySold;
      await updateProductQuantity(productId, newQuantity, entrepriseId);

      const totalPrice = product.selling_price * quantitySold;
      await createSale(productId, quantitySold, totalPrice, entrepriseId);

      const lowStockCheck = await checkLowStock(productId, entrepriseId);

      res.status(200).json({
        message: "Purchase successful",
        product: { ...product, quantity: newQuantity },
        sale: { productId, quantitySold, totalPrice },
        lowStockAlert: lowStockCheck.alert,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  // --- Créer un nouveau produit ---
  post: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const {
        Prod_name,
        quantity,
        cost_price,
        selling_price,
        category_id,
        Prod_Description,
        code_bar,
        date_of_arrival,
        supplier,
        min_stock_level,
        max_stock_level,
      } = req.body;

      const Prod_image = req.file ? `/uploads/${req.file.filename}` : null;

      const newProduct = await createProduct(
        Prod_name,
        quantity,
        cost_price,
        selling_price,
        category_id,
        Prod_Description,
        code_bar,
        date_of_arrival,
        supplier,
        Prod_image,
        min_stock_level,
        max_stock_level,
        entrepriseId
      );

      res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ error: "Failed to add product" });
    }
  },

  // --- Mettre à jour un produit ---
  updated: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const { id } = req.params;
      const {
        Prod_name,
        quantity,
        cost_price,
        selling_price,
        category,
        Prod_Description,
        code_bar,
        date_of_arrival,
        supplier,
        min_stock_level,
        max_stock_level,
      } = req.body;

      let prod_image = req.file ? `/uploads/${req.file.filename}` : null;

      const updated = await updateProduct(
        id,
        Prod_name,
        quantity,
        cost_price,
        selling_price,
        category,
        Prod_Description,
        code_bar,
        date_of_arrival,
        supplier,
        prod_image,
        min_stock_level,
        max_stock_level,
        entrepriseId
      );

      if (!updated) return res.status(404).json({ message: "Product not found" });

      res.json({ message: "Product updated successfully" });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Failed to update product" });
    }
  },

  // --- Supprimer un produit ---
  delete: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const { id } = req.params;

      const deleted = await deleteProduct(id, entrepriseId);

      if (!deleted) return res.status(404).json({ message: "Product not found" });

      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  },

  // --- Produits par catégorie ---
  getProductsByCategory: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const categoryId = parseInt(req.params.categoryId);
      if (isNaN(categoryId)) return res.status(400).json({ message: "Invalid category ID" });

      const products = await getProductsByCategoryId(categoryId, entrepriseId);
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  // --- Vérification stock faible ---
  checkLowStockGlobal: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const thresholdParam = req.query.threshold ? parseInt(req.query.threshold) : undefined;
      const { threshold, products } = await getLowStockProductsGlobal(thresholdParam, entrepriseId);

      if (products.length === 0) {
        return res.json({ message: "All products have sufficient stock", threshold });
      }

      res.json({
        message: `Some products are below the stock threshold of ${threshold}`,
        products,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // --- Vérification produits en rupture ---
  checkOutOfStockGlobal: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const products = await getOutOfStockProducts(entrepriseId);

      if (products.length === 0) {
        return res.json({ message: "All products have stock available", products: [] });
      }

      const quantity = 5;
      const orders = [];

      for (let prod of products) {
        const product = await getOneProduct(prod.id, entrepriseId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const supplier = await getOnesupplier(prod.supplier);
        if (!supplier) return res.status(404).json({ message: "Supplier not found" });

        const order = await createOrder(product.id, supplier.id, quantity);
        orders.push(order);
      }

      res.json({ message: "Some products are out of stock", products, orders });
    } catch (error) {
      console.error("Error in checkOutOfStockGlobal:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // --- Récupérer les ventes ---
  getsales: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const sales = await getSales(entrepriseId);

      if (sales.length === 0) return res.json({ message: "No sales data available" });

      res.json({ sales });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
};
