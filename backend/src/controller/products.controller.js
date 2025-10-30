const sequelizeQuery = require("sequelize-query");
const db = require("../config/db"); // ton index.js où tu as tous tes modèles
const { Op, fn, col } = require("sequelize");
require("dotenv").config();
const Product = db.Product;
const Category = db.Category;
const Supplier = db.Supplier;
const Settings = db.Setting;
const Entreprise = db.Entreprise;
const Sales = db.Sales;
const fs = require("fs");
const path = require("path");
const queryParser = sequelizeQuery(db);
const BASE_URL = process.env.BASE_URL;
const logActivity = require("../utils/activityLogger");

// ===============================
// 🔹 Récupérer tous les produits
// ===============================
exports.getAllProducts = async (req, res) => {
  console.log("GET /api/products called");

  try {
    const query = await queryParser.parse(req);

    if (req.user || req.entrepriseId) {
      query.where = { ...query.where, entreprise_id: req.entrepriseId };
    }

    const products = await Product.findAll({
      ...query,
      include: [
        { model: Category, as: "category", attributes: ["id", "name"] },
        {
          model: Supplier,
          as: "supplierInfo",
          attributes: ["id", "supplier_name"],
        },
      ],
    });

    // Transformer le chemin des images pour renvoyer l'URL complète
    const data = products.map((p) => {
      const prodJSON = p.toJSON();
      if (prodJSON.Prod_image) {
        prodJSON.Prod_image = `${BASE_URL}${prodJSON.Prod_image}`;
      }
      return prodJSON;
    });

    const count = await Product.count({ where: query.where });

    res.status(200).json({ count, data });
  } catch (err) {
     console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Récupérer un produit par ID
// ===============================
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findOne({
      where: { id, entreprise_id: req.entrepriseId },
      include: [
        { model: Category, as: "category", attributes: ["id", "name"] },
        {
          model: Supplier,
          as: "supplierInfo",
          attributes: ["id", "supplier_name"],
        },
      ],
    });

    if (!data) return res.status(404).json({ message: "Produit non trouvé" });

    const product = data.toJSON();
    if (product.Prod_image) {
      product.Prod_image = `${BASE_URL}${product.Prod_image}`;
    }

    res.status(200).json(product);
  } catch (err) {
    console.error("🔥 Erreur dans getProductById:", err);
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Créer un produit (avec image)
// ===============================
exports.createProduct = async (req, res) => {
  try {
    const entreprise_id = req.entrepriseId;

    // ✅ Si une image a été uploadée, on génère son URL publique
    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const productData = {
      ...req.body,
      entreprise_id,
      Prod_image: imagePath, // 👈 ajouter ici l’image
    };

    const product = await Product.create(productData);
    await logActivity({
      user_id: req.user.id,
      action: "creation d'un produit(achat de un nouveux)",
      entity_type: "Product",
      entity_id: product.id,
      description: `Création du produit "${product.Prod_name} "`,
      quantity: product.quantity,
      amount: product.quantity,
      ip_address: req.ip,
      user_agent: req.headers["user-agent"],
      entreprise_id: entrepriseId,
    });
    res.status(201).json(product);
  } catch (err) {
    console.error("🔥 Erreur createProduct:", err);
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Mettre à jour un produit
// ===============================
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const entreprise_id = req.entrepriseId;

    const product = await Product.findOne({
      where: { id, entreprise_id },
    });

    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    // ✅ Si une nouvelle image est uploadée
    if (req.file) {
      // Supprimer l'ancienne image si elle existe
      if (product.Prod_image) {
        const oldPath = path.join(process.cwd(), product.Prod_image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      req.body.Prod_image = `/uploads/${req.file.filename}`;
    }

    await product.update(req.body);

    res.status(200).json({
      message: "Produit mis à jour avec succès",
      product,
    });
  } catch (err) {
    console.error("🔥 Erreur updateProduct:", err);
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Supprimer un produit
// ===============================
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const entreprise_id = req.entrepriseId;

    const deleted = await Product.destroy({
      where: { id, entreprise_id },
    });

    if (!deleted)
      return res.status(404).json({ message: "Produit non trouvé" });

    res.json({ message: "Produit supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Créer une vente
// ===============================
exports.createSale = async (req, res) => {
  try {
    const { productId, quantitySold, totalPrice } = req.body;
    const entreprise_id = req.entrepriseId;

    const product = await Product.findOne({
      where: { id: productId, entreprise_id },
    });

    if (!product)
      return res.status(404).json({ message: "Produit introuvable" });

    const total_profit =
      (product.selling_price - product.cost_price) * quantitySold;

    const sale = await Sales.create({
      product_id: productId,
      quantity_sold: quantitySold,
      total_price: totalPrice,
      total_profit,
      entreprise_id: entrepriseId,
    });
    await logActivity({
      user_id: req.user.id,
      action: "Vente",
      entity_type: "Product",
      entity_id: product.id,
      description: `Vente de ${quantitySold} unités de "${product.Prod_name}"`,
      quantity: quantitySold,
      amount: quantitySold * product.selling_price,
      ip_address: req.ip,
      user_agent: req.headers["user-agent"],
      entreprise_id: entrepriseId,
    });

    // 🔹 Mettre à jour la quantité en stock
    product.quantity -= quantitySold;
    await product.save();

    res.status(201).json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Ajouter de la quantité
// ===============================

exports.addQuantity = async (req, res) => {
  console.log("====================================");
  console.log("add product called");
  console.log("====================================");

  const t = await db.sequelize.transaction(); // 🔸 Démarrer la transaction
  try {
    const { productId, quantityAdd } = req.body;
    const entrepriseId = req.entrepriseId;

    console.log("====================================");
    console.log(req.body);
    console.log("====================================");

    // 🔹 1. Vérifier que le produit existe
    const product = await db.Product.findOne({
      where: { id: productId, entreprise_id: entrepriseId },
      transaction: t, // ✅ lier à la transaction
      lock: true, // ✅ empêche les accès concurrents
    });

    if (!product) {
      await t.rollback(); // rollback si produit non trouvé
      return res.status(404).json({
        success: false,
        message: "Produit non trouvé",
      });
    }

    // 🔹 2. Mettre à jour la quantité
    product.quantity += quantityAdd;
    await product.save({ transaction: t });

    console.log("✅ Quantité mise à jour");
        const entreprise = await Entreprise.findByPk(entrepriseId);
        const user_id = entreprise?.user_id || null;
    // 🔹 3. Enregistrer l’activité
    await logActivity(
      {
        user_id: user_id,
        action: "Achat",
        entity_type: "Product",
        entity_id: product.id,
        description: `Achat de ${quantityAdd} unités de "${product.Prod_name}"`,
        quantity: quantityAdd,
        amount: quantityAdd * product.cost_price,
        ip_address: req.ip,
        user_agent: req.headers["user-agent"],
        entreprise_id: entrepriseId,
        transaction: t, // ✅ très important
      },
      { transaction: t }
    );

    // 🔹 4. Si tout est ok → valider la transaction
    await t.commit();

    res.status(200).json({
      success: true,
      message: "Quantité ajoutée avec succès",
      product,
    });
  } catch (err) {
    // 🔹 Si erreur → annuler la transaction
    await t.rollback();
    console.error("🔥 Transaction échouée :", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ===============================
// 🔹 Acheter un produit (vente)
// ===============================
exports.buyProduct = async (req, res) => {
  try {
    const { productId, quantitySold } = req.body;
    const entrepriseId = req.entrepriseId;

    const product = await Product.findOne({
      where: { id: productId, entreprise_id: entrepriseId },
    });
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Produit non trouvé" });
    if (product.quantity < quantitySold)
      return res
        .status(400)
        .json({ success: false, message: "Stock insuffisant" });

    product.quantity -= quantitySold;
    await product.save();

    // ici tu peux créer une vente si tu as le modèle Sale
    if (db.Sale) {
      await db.Sale.create({
        product_id: productId,
        quantity_sold: quantitySold,
        total_price: product.selling_price * quantitySold,
        total_profit:
          (product.selling_price - product.cost_price) * quantitySold,
        entreprise_id: entrepriseId,
      });
    }
    // Logger la vente
    await logActivity({
      user_id: req.user.id,
      action: "Vente",
      entity_type: "Product",
      entity_id: product.id,
      description: `Vente de ${quantitySold} unités de "${product.Prod_name}"`,
      quantity: quantitySold,
      amount: quantitySold * product.selling_price,
      ip_address: req.ip,
      user_agent: req.headers["user-agent"],
      entreprise_id: entrepriseId,
    });

    res
      .status(200)
      .json({ success: true, message: "Vente enregistrée", product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ===============================
// 🔹 Produits en stock faible
// ===============================
exports.getLowStockProducts = async (req, res) => {
  try {
    const entrepriseId = req.entrepriseId;
    console.log(entrepriseId);
    
    const settings = await Settings.findOne({
      where: { entreprise_id: entrepriseId },
    });
    const threshold = settings?.stock_alert_threshold || 5;
  
    const products = await Product.findAll({
      where: { entreprise_id: entrepriseId, quantity: { [Op.lte]: threshold } },
      include: [
        { model: Category,as: "category" ,attributes: ["id", "name"] },
        { model: Supplier,as: "supplierInfo", attributes: ["id", "supplier_name"] },
      ],
    });
  console.log('====================================');
    console.log(Product);
    console.log('====================================');
    res.json({ threshold, products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Produits en rupture de stock
// ===============================
exports.getOutOfStockProducts = async (req, res) => {
  try {
    const entrepriseId = req.user.entreprise_id;

    const products = await Product.findAll({
      where: { entreprise_id: entrepriseId, quantity: 0 },
      include: [
        { model: Category, attributes: ["id", "name"] },
        { model: Supplier, attributes: ["id", "supplier_name"] },
      ],
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Produits par catégorie
// ===============================
exports.getProductsByCategory = async (req, res) => {
  console.log("====================================");
  console.log("products by category called");
  console.log("====================================");
  try {
    const categoryId = parseInt(req.params.categoryId);
    if (isNaN(categoryId))
      return res
        .status(400)
        .json({ success: false, message: "ID de catégorie invalide" });
    console.log("====================================");
    console.log("this is the category id received", categoryId);
    console.log("====================================");

    const data = await Product.findAll({
      where: {
        category_id: categoryId,
        entreprise_id: req.entrepriseId,
      },
      include: [
        { model: Category, as: "category", attributes: ["name"] }, // alias exact
        {
          model: Supplier,
          as: "supplierInfo",
          attributes: ["supplier_name", "email", "whatsapp_number"],
        },
      ],
      order: [["Prod_name", "ASC"]],
    });
    const count = await Product.count({
      where: {
        category_id: categoryId,
        entreprise_id: req.entrepriseId,
      },
    });
     // Transformer le chemin des images pour renvoyer l'URL complète
    const products = data.map((p) => {
      const prodJSON = p.toJSON();
      if (prodJSON.Prod_image) {
        prodJSON.Prod_image = `${BASE_URL}${prodJSON.Prod_image}`;
      }
      return prodJSON;
    });
    console.log("====================================");
    console.log(count);
    console.log("====================================");

    res.status(200).json({ count, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ===============================
// 🔹 Récupérer toutes les ventes
// ===============================
exports.getSales = async (req, res) => {
  try {
    const query = await queryParser.parse(req);

    // Filtrer par entreprise
    query.where = { ...query.where, entreprise_id: req.entrepriseId };

    const sales = await Sale.findAll({
      ...query,
      include: [{ model: Product, attributes: ["Prod_name", "selling_price"] }],
      order: [["createdAt", "DESC"]],
    });

    const count = await Sale.count({
      where: query.where,
    });

    res.status(200).json({ success: true, count, sales });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
