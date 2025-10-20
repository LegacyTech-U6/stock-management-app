const sequelizeQuery = require("sequelize-query");
const db = require("../config/db"); // ton index.js où tu as tous tes modèles
const { Op, fn, col } = require("sequelize");
const Product = db.Product;
const Category = db.Category;
const Supplier = db.Supplier;
const Settings = db.Settings;
const Sales = db.Sales;

const queryParser = sequelizeQuery(db);

// ===============================
// 🔹 Récupérer tous les produits
// ===============================
exports.getAllProducts = async (req, res) => {
  try {
    // Parse automatiquement req.query (filter, sort, limit, offset)
    const query = await queryParser.parse(req);

    // Ici on peut ajouter un filtre supplémentaire pour l'entreprise si besoin
    if (req.user && req.user.entrepriseId) {
      query.where = { ...query.where, entreprise_id: req.entrepriseId };
    }

    // Récupérer les données
    const data = await Product.findAll({
      ...query,
      include: [
        { model: Category, attributes: ["id", "name"] },
        { model: Supplier, attributes: ["id", "supplier_name"] },
      ],
    });

    // Récupérer le nombre total (pour pagination)
    const count = await Product.count({
      where: query.where,
    });

    res.status(200).json({ count, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Récupérer un produit par ID
// ===============================
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id, entreprise_id: req.entrepriseId },
      include: [
        { model: Category, attributes: ["id", "name"] },
        { model: Supplier, attributes: ["id", "supplier_name"] },
      ],
    });
    if (!product)
      return res.status(404).json({ message: "Produit non trouvé" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Créer un produit
// ===============================
exports.createProduct = async (req, res) => {
  try {
    const entreprise_id = req.entrepriseId;
    const productData = { ...req.body, entreprise_id };
    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (err) {
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

    const [updated] = await Product.update(req.body, {
      where: { id, entreprise_id },
    });

    if (!updated)
      return res.status(404).json({ message: "Produit non trouvé" });

    res.status(200).json({ message: "Produit mis à jour avec succès" });
  } catch (err) {
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
  try {
    const { productId, quantityAdd } = req.body;
    const entrepriseId = req.entrepriseId;

    const product = await Product.findOne({ where: { id: productId, entreprise_id: entrepriseId } });
    if (!product) return res.status(404).json({ success: false, message: 'Produit non trouvé' });

    product.quantity += quantityAdd;
    await product.save();

    res.status(200).json({ success: true, message: 'Quantité ajoutée', product });
  } catch (err) {
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

    const product = await Product.findOne({ where: { id: productId, entreprise_id: entrepriseId } });
    if (!product) return res.status(404).json({ success: false, message: 'Produit non trouvé' });
    if (product.quantity < quantitySold) return res.status(400).json({ success: false, message: 'Stock insuffisant' });

    product.quantity -= quantitySold;
    await product.save();

    // ici tu peux créer une vente si tu as le modèle Sale
    if (db.Sale) {
      await db.Sale.create({
        product_id: productId,
        quantity_sold: quantitySold,
        total_price: product.selling_price * quantitySold,
        total_profit: (product.selling_price - product.cost_price) * quantitySold,
        entreprise_id: entrepriseId,
      });
    }

    res.status(200).json({ success: true, message: 'Vente enregistrée', product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ===============================
// 🔹 Produits en stock faible
// ===============================
exports.getLowStockProducts = async (req, res) => {
  try {
    const entrepriseId = reqentreprise_id;

    const settings = await Settings.findOne({
      where: { entreprise_id: entrepriseId },
    });
    const threshold = settings?.stock_alert_threshold || 5;

    const products = await Product.findAll({
      where: { entreprise_id: entrepriseId, quantity: { [Op.lte]: threshold } },
      include: [
        { model: Category, attributes: ["id", "name"] },
        { model: Supplier, attributes: ["id", "supplier_name"] },
      ],
    });

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
  try {
    const categoryId = parseInt(req.params.categoryId);
    if (isNaN(categoryId)) return res.status(400).json({ success: false, message: 'ID de catégorie invalide' });

    const products = await Product.findAll({
      where: {
        category_id: categoryId,
        entreprise_id: req.entrepriseId,
      },
      include: [
        { model: db.Category, attributes: ['name'] },
        { model: db.Supplier, attributes: ['supplier_name', 'email', 'whatsapp_number'] },
      ],
      order: [['Prod_name', 'ASC']],
    });

    res.status(200).json({ success: true, count: products.length, products });
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
      include: [
        { model: Product, attributes: ['Prod_name', 'selling_price'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    const count = await Sale.count({
      where: query.where,
    });

    res.status(200).json({ success: true, count, sales });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};