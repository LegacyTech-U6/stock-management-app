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
const express = require("express");
const router = express.Router();
module.exports = {
  get: async (req, res, next) => {
    const products_Data = await getProduct();
    res.send(products_Data);
  },
  get2: async (req, res) => {
    const id = req.params.id;
    const product_Data = await getOneProduct(id);
    res.send(product_Data);
  },

  addProduct: async (req, res) => {
    try {
      const { productId, quantityAdd } = req.body;
      console.log(req.body);

      if (!productId || !quantityAdd || quantityAdd <= 0) {
        return res
          .status(400)
          .json({ message: "Invalid product ID or quantity" });
      }

      // 1.  Get product

      const product = await getOneProduct(productId);
      

      // 2. updating the quantity

      const newQuantity = product.quantity + quantityAdd;
      await updateProductQuantity(productId, newQuantity);

      //3.Return response

      res.status(200).json({
        message: "quantity added succesfully",
        product: { ...product, quantity: newQuantity },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "server error", error: error.message });
    }
  },

  buyProduct: async (req, res) => {
    try {
      const { productId, quantitySold } = req.body;

      if (!productId || !quantitySold || quantitySold <= 0) {
        return res
          .status(400)
          .json({ message: "Invalid product ID or quantity" });
      }

      // 1. Get product
      const products = await getOneProduct(productId);
      if (products.length === 0) {
        return res
          .status(404)
          .json({ message: "Product not found or product finished" });
      }

      const product = products[0];

      // 2. Check stock
      if (product.quantity < quantitySold) {
        return res.status(400).json({ message: "Not enough stock available" });
      }

      // 3. Update quantity
      const newQuantity = product.quantity - quantitySold;
      await updateProductQuantity(productId, newQuantity);

      // 4. Record sale
      const totalPrice = product.selling_price * quantitySold;
      await createSale(productId, quantitySold, totalPrice);
      // 5. Vérifier le seuil global
      const lowStockCheck = await checkLowStock(productId);
      if (lowStockCheck.alert) {
        console.log(
          `⚠️ ALERTE : Le produit "${lowStockCheck.product.Prod_name}" est presque en rupture (${lowStockCheck.product.quantity} restants, seuil = ${lowStockCheck.threshold})`
        );
        // Ici tu peux renvoyer aussi l'alerte dans la réponse
      }

      // 6. Return response
      res.status(200).json({
        message: "Purchase successful",
        product: { ...product, quantity: newQuantity },
        sale: { productId, quantitySold, totalPrice },
        lowStockAlert: lowStockCheck.alert,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },

  post: async (req, res) => {
    try {
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
        max_stock_level
      } = req.body;

      // Multer adds req.file if image uploaded
      const Prod_image = req.file ? `/uploads/${req.file.filename}` : null;
      console.log(req.body);
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
        max_stock_level
      );

      res
        .status(201)
        .json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ error: "Failed to add product" });
    }
  },
  updated: async (req, res) => {
    try {
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
        max_stock_level
      } = req.body;

      let prod_image = null;

      if (req.file) {
        // ✅ If a new file is uploaded
        prod_image = `/uploads/${req.file.filename}`;

        // 1️⃣ Get the old product
        const oldProduct = await getProductById(id);

        if (oldProduct && oldProduct.Prod_image) {
          const oldPath = path.join(__dirname, "..", oldProduct.Prod_image);

          // 2️⃣ Delete old image safely
          fs.unlink(oldPath, (err) => {
            if (err) {
              console.error("⚠️ Failed to delete old image:", err);
            } else {
              console.log("🗑 Old image deleted:", oldPath);
            }
          });
        }
      }

      // 3️⃣ Update product in DB
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
        prod_image, // null if no new image
        min_stock_level,
        max_stock_level
      );

      if (!updated) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({ message: "Product updated successfully" });
    } catch (error) {
      console.error("❌ Error updating product:", error);
      res.status(500).json({ error: "Failed to update product" });
    }
  },
  delete: async (req, res) => {
     try {
    const { id } = req.params;

    // 1️⃣ Get product from DB
    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2️⃣ Delete product from DB
    const deleted = await deleteProduct(id);

    if (!deleted) {
      return res.status(500).json({ message: "Failed to delete product" });
    }

    // 3️⃣ Remove image file if exists
    if (product.Prod_image) {
      const filePath = path.join(__dirname, "..", product.Prod_image);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("⚠️ Failed to delete image:", err);
        } else {
          console.log("🗑 Image deleted:", filePath);
        }
      });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
  },
  getProductsByCategory: async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      if (isNaN(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }

      const products = await getProductsByCategoryId(categoryId);
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },
  checkLowStockGlobal: async (req, res) => {
    console.log("Route checkLowStockGlobal appelée");
    try {
      const thresholdParam = req.query.threshold
        ? parseInt(req.query.threshold)
        : undefined;
      console.log("Threshold reçu en query:", thresholdParam);
      const { threshold, products } = await getLowStockProductsGlobal(
        thresholdParam
      );
      console.log("Produits récupérés dans le contrôleur:", products);
      if (products.length === 0) {
        return res.json({
          message: "All products have sufficient stock",
          threshold,
        });
      }
      res.json({
        message: `Some products are below the stock threshold of ${threshold}`,
        products,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  checkOutOfStockGlobal: async (req, res) => {
    console.log("Route checkOutOfStockGlobal appelée");
    try {
      const products = await getOutOfStockProducts();

      if (products.length === 0) {
        return res.json({
          message: "All products have stock available",
          products: [],
        });
      }
      const quantity = 5;
      let orders = [];
      for (let i = 0; i < products.length; i++) {
        const product = await getOneProduct(products[i].id);
        if (!product) {
          return res
            .status(404)
            .json({ success: false, message: "Produit introuvable" });
        }

        const supplier = await getOnesupplier(products[i].supplier);
        if (!supplier) {
          return res
            .status(404)
            .json({ success: false, message: "Fournisseur introuvable" });
        }

        const order = await createOrder(product.id, supplier.id, quantity);
        orders.push(order);
      }

      res.json({
        message: "Some products are out of stock",
        products,
        orders,
      });
    } catch (error) {
      console.error("Erreur dans checkOutOfStockGlobal:", error);
      res.status(500).json({ error: error.message });
    }
  },
  getsales: async (req, res) => {
    try {
      const sales = await getSales();
      if (sales.length === 0) {
        return res.json({ message: "No sales data available" });
      }
      res.json({ sales });
    } catch (error) {
      console.error("Erreur dans getsales:", error);
      res.status(500).json({ error: error.message });
    }
  },
};
