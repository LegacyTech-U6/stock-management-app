const { pool } = require("../config/db");

// ✅ Récupérer tous les produits d'une entreprise
async function getProduct(entrepriseId) {
  const [rows] = await pool.query(
    `SELECT 
      p.id,
      p.Prod_name,
      p.quantity,
      p.cost_price,
      p.selling_price,
      p.Prod_Description,
      p.code_bar,
      p.date_of_arrival,
      p.Prod_image,
      p.min_stock_level,
      p.max_stock_level,
      c.name AS category_name,
      s.supplier_name
    FROM Product p
    LEFT JOIN Category c ON p.category_id = c.id
    LEFT JOIN supplier s ON p.supplier = s.id
    WHERE p.entreprise_id = ?
    ORDER BY p.Prod_name`,
    [entrepriseId]
  );
  return rows;
}

// ✅ Récupérer un produit par ID et entreprise
async function getOneProduct(id, entrepriseId) {
  const [rows] = await pool.query(
    `SELECT 
      p.id,
      p.Prod_name,
      p.quantity,
      p.cost_price,
      p.selling_price,
      p.Prod_Description,
      p.code_bar,
      p.date_of_arrival,
      p.Prod_image,
      p.min_stock_level,
      p.max_stock_level,
      c.name AS category_name,
      s.supplier_name
    FROM Product p
    LEFT JOIN Category c ON p.category_id = c.id
    LEFT JOIN supplier s ON p.supplier = s.id
    WHERE p.id = ? AND p.entreprise_id = ?`,
    [id, entrepriseId]
  );
  return rows[0] || null;
}

// ✅ Créer un produit pour une entreprise
async function createProduct(
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
) {
  const [results] = await pool.query(
    `INSERT INTO Product (
      entreprise_id,
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
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      entrepriseId,
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
    ]
  );
  return results.insertId;
}

// ✅ Mettre à jour un produit (uniquement s'il appartient à l'entreprise)
async function updateProduct(
  id,
  prod_name,
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
) {
  let query = `
    UPDATE Product SET
      Prod_name = ?,
      quantity = ?,
      cost_price = ?,
      selling_price = ?,
      category_id = ?,
      Prod_Description = ?,
      code_bar = ?,
      date_of_arrival = ?,
      supplier = ?,
      min_stock_level = ?,
      max_stock_level = ?
  `;
  const values = [
    prod_name,
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
  ];

  if (prod_image) {
    query += `, Prod_image = ?`;
    values.push(prod_image);
  }

  query += ` WHERE id = ? AND entreprise_id = ?`;
  values.push(id, entrepriseId);

  const [result] = await pool.query(query, values);
  return result.affectedRows > 0;
}

// ✅ Supprimer un produit (uniquement s'il appartient à l'entreprise)
async function deleteProduct(id, entrepriseId) {
  const [result] = await pool.query(
    `DELETE FROM Product WHERE id = ? AND entreprise_id = ?`,
    [id, entrepriseId]
  );
  return result.affectedRows > 0;
}

// ✅ Ajouter la logique pour les ventes, low stock, etc., en incluant entrepriseId
async function createSale(productId, quantitySold, totalPrice, entrepriseId) {
  const product = await getOneProduct(productId, entrepriseId);
  if (!product) throw new Error("Produit introuvable pour cette entreprise");

  const total_profit = (product.selling_price - product.cost_price) * quantitySold;

  const [result] = await pool.query(
    `INSERT INTO Sales (product_id, quantity_sold, total_price, total_profit, entreprise_id) VALUES (?, ?, ?, ?, ?)`,
    [productId, quantitySold, totalPrice, total_profit, entrepriseId]
  );

  return result.insertId;
}

// ✅ Récupérer les ventes d'une entreprise
async function getSales(entrepriseId) {
  const [rows] = await pool.query(
    `SELECT * FROM Sales WHERE entreprise_id = ?`,
    [entrepriseId]
  );
  return rows;
}

module.exports = {
  getProduct,
  createProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
  createSale,
  getSales,
};
