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
  // ✅ Obtenir tous les produits
  get: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const products = await getProduct(entrepriseId);
      res.json(products);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // ✅ Obtenir un produit
  get2: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const id = parseInt(req.params.id);
      const product = await getOneProduct(id, entrepriseId);
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // ✅ Ajouter de la quantité
  addProduct: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const { productId, quantityAdd } = req.body;

      if (!productId || !quantityAdd || quantityAdd <= 0)
        return res.status(400).json({ message: "Invalid product ID or quantity" });

      const product = await getOneProduct(productId, entrepriseId);
      if (!product) return res.status(404).json({ message: "Product not found" });

      const newQuantity = product.quantity + quantityAdd;
      await updateProductQuantity(productId, newQuantity, entrepriseId);

      res.json({ message: "Quantity updated", product: { ...product, quantity: newQuantity } });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // ✅ Acheter un produit (crée une vente)
  buyProduct: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const { productId, quantitySold } = req.body;

      if (!productId || !quantitySold || quantitySold <= 0)
        return res.status(400).json({ message: "Invalid product ID or quantity" });

      const product = await getOneProduct(productId, entrepriseId);
      if (!product) return res.status(404).json({ message: "Product not found" });

      if (product.quantity < quantitySold)
        return res.status(400).json({ message: "Not enough stock" });

      const newQuantity = product.quantity - quantitySold;
      await updateProductQuantity(productId, newQuantity, entrepriseId);

      const totalPrice = product.selling_price * quantitySold;
      await createSale(productId, quantitySold, totalPrice, entrepriseId);

      const lowStockCheck = await checkLowStock(productId, entrepriseId);

      res.json({
        message: "Sale recorded successfully",
        product: { ...product, quantity: newQuantity },
        lowStockAlert: lowStockCheck.alert,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // ✅ Créer un produit
  post: async (req, res) => {
    console.log('req.body =', req.body)
console.log('req.file =', req.file)

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

      res.status(201).json({ message: "Product added", product: newProduct });
    } catch (error) {
      console.error("❌ Error adding product:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // ✅ Mettre à jour un produit
  updated: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const { id } = req.params;
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

      const product = await getOneProduct(id, entrepriseId);
      if (!product) return res.status(404).json({ message: "Product not found" });

      let prod_image = product.Prod_image;
      if (req.file) {
        // Supprime l’ancienne image
        if (prod_image && fs.existsSync(path.join(__dirname, "..", prod_image))) {
          fs.unlinkSync(path.join(__dirname, "..", prod_image));
        }
        prod_image = `/uploads/${req.file.filename}`;
      }

      await updateProduct(
        id,
        Prod_name,
        quantity,
        cost_price,
        selling_price,
        category_id,
        Prod_Description,
        code_bar,
        date_of_arrival,
        supplier,
        prod_image,
        min_stock_level,
        max_stock_level,
        entrepriseId
      );

      res.json({ message: "Product updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // ✅ Supprimer un produit
  delete: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const { id } = req.params;

      const deleted = await deleteProduct(id, entrepriseId);
      if (!deleted) return res.status(404).json({ message: "Product not found" });

      res.json({ message: "Product deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // ✅ Produits par catégorie
  getProductsByCategory: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const categoryId = parseInt(req.params.categoryId);
      if (isNaN(categoryId)) return res.status(400).json({ message: "Invalid category ID" });

      const products = await getProductsByCategoryId(categoryId, entrepriseId);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // ✅ Vérification du stock faible
  checkLowStockGlobal: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const { threshold, products } = await getLowStockProductsGlobal(entrepriseId);
      res.json({ threshold, products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // ✅ Vérification des produits en rupture
  checkOutOfStockGlobal: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const products = await getOutOfStockProducts(entrepriseId);

      if (products.length === 0)
        return res.json({ message: "All products have stock available" });

      const quantity = 5;
      const orders = [];

      for (const prod of products) {
        const product = await getOneProduct(prod.id, entrepriseId);
        const supplier = await getOnesupplier(prod.supplier);
        if (product && supplier) {
          const order = await createOrder(product.id, supplier.id, quantity);
          orders.push(order);
        }
      }

      res.json({ message: "Some products are out of stock", products, orders });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // ✅ Récupérer les ventes
  getsales: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const sales = await getSales(entrepriseId);
      res.json({ sales });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
