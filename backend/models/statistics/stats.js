// ============================================================
// 📊 STOCKLY STATISTICS & ANALYTICS MODEL (Multi-Enterprise Ready)
// ------------------------------------------------------------
// This module computes sales KPIs (revenue, profit, trends, best products, etc.)
// directly from the MySQL database. Supports:
// 1️⃣ Enterprise-specific stats (enterpriseId)
// 2️⃣ User-wide stats across all enterprises (userId)
// ============================================================

const { pool } = require("../../config/db");

/**
 * 🔹 getUserEnterpriseIds(userId)
 * ------------------------------------------------------------
 * Returns an array of enterprise IDs belonging to a specific user.
 */
async function getUserEnterpriseIds(userId) {
  const [rows] = await pool.query(
    "SELECT id FROM Entreprises WHERE user_id = ?",
    [userId]
  );
  return rows.map(e => e.id);
}

/**
 * 🔹 getProductSalesStats({ enterpriseId, userId })
 * ------------------------------------------------------------
 * Returns total quantity sold per product.
 * - enterpriseId: stats for a specific enterprise
 * - userId: stats across all user enterprises
 */
async function getProductSalesStats({ enterpriseId = null, userId = null } = {}) {
  let condition = [];
  let params = [];

  if (enterpriseId) {
    condition.push("p.entreprise_id = ?");
    params.push(enterpriseId);
  } else if (userId) {
    const enterpriseIds = await getUserEnterpriseIds(userId);
    if (enterpriseIds.length === 0) return [];
    condition.push(`p.entreprise_id IN (${enterpriseIds.map(() => "?").join(",")})`);
    params.push(...enterpriseIds);
  }

  const [rows] = await pool.query(`
    SELECT p.id AS product_id, p.Prod_name, SUM(s.quantity_sold) AS total_sold
    FROM Sales s
    JOIN Product p ON s.product_id = p.id
    ${condition.length ? "WHERE " + condition.join(" AND ") : ""}
    GROUP BY p.id, p.Prod_name
    ORDER BY total_sold DESC
  `, params);

  return rows;
}

/**
 * 🔹 getSalesReportByPeriod(period, { enterpriseId, userId })
 * ------------------------------------------------------------
 * Returns sales totals per product filtered by period:
 *  - period = "day" | "week" | "month"
 */
async function getSalesReportByPeriod(period = "month", { enterpriseId = null, userId = null } = {}) {
  let condition = [];
  let params = [];

  if (period === "day") condition.push("DATE(s.sale_date) = CURDATE()");
  else if (period === "week") condition.push("YEARWEEK(s.sale_date,1) = YEARWEEK(CURDATE(),1)");
  else if (period === "month") condition.push("YEAR(s.sale_date) = YEAR(CURDATE()) AND MONTH(s.sale_date) = MONTH(CURDATE())");

  if (enterpriseId) {
    condition.push("p.entreprise_id = ?");
    params.push(enterpriseId);
  } else if (userId) {
    const enterpriseIds = await getUserEnterpriseIds(userId);
    if (enterpriseIds.length === 0) return [];
    condition.push(`p.entreprise_id IN (${enterpriseIds.map(() => "?").join(",")})`);
    params.push(...enterpriseIds);
  }

  const [rows] = await pool.query(`
    SELECT p.id AS product_id, p.Prod_name, SUM(s.quantity_sold) AS total_sold
    FROM Sales s
    JOIN Product p ON s.product_id = p.id
    ${condition.length ? "WHERE " + condition.join(" AND ") : ""}
    GROUP BY p.id, p.Prod_name
    ORDER BY total_sold DESC
  `, params);

  return rows;
}

/**
 * 🔹 getBestCategory({ enterpriseId, userId })
 * ------------------------------------------------------------
 * Returns categories ordered by total quantity sold.
 */
async function getBestCategory({ enterpriseId = null, userId = null } = {}) {
  let condition = [];
  let params = [];

  if (enterpriseId) {
    condition.push("p.entreprise_id = ?");
    params.push(enterpriseId);
  } else if (userId) {
    const enterpriseIds = await getUserEnterpriseIds(userId);
    if (enterpriseIds.length === 0) return [];
    condition.push(`p.entreprise_id IN (${enterpriseIds.map(() => "?").join(",")})`);
    params.push(...enterpriseIds);
  }

  const [rows] = await pool.query(`
    SELECT c.id AS category_id, c.name AS category_name, SUM(s.quantity_sold) AS total_quantity_sold
    FROM Sales s
    JOIN Product p ON s.product_id = p.id
    JOIN Category c ON p.category_id = c.id
    ${condition.length ? "WHERE " + condition.join(" AND ") : ""}
    GROUP BY c.id, c.name
    ORDER BY total_quantity_sold DESC
  `, params);

  return rows;
}

/**
 * 🔹 bestProductByCategory(categoryId, { enterpriseId, userId })
 * ------------------------------------------------------------
 * Returns products in a category ordered by total sales.
 */
async function bestProductByCategory(categoryId = null, { enterpriseId = null, userId = null } = {}) {
  let condition = [];
  let params = [];

  if (categoryId) {
    condition.push("c.id = ?");
    params.push(categoryId);
  }
  if (enterpriseId) {
    condition.push("p.entreprise_id = ?");
    params.push(enterpriseId);
  } else if (userId) {
    const enterpriseIds = await getUserEnterpriseIds(userId);
    if (enterpriseIds.length === 0) return [];
    condition.push(`p.entreprise_id IN (${enterpriseIds.map(() => "?").join(",")})`);
    params.push(...enterpriseIds);
  }

  const [rows] = await pool.query(`
    SELECT c.id AS category_id, c.name AS category_name,
           p.id AS product_id, p.Prod_name AS product_name,
           SUM(s.quantity_sold) AS total_sold
    FROM Sales s
    JOIN Product p ON s.product_id = p.id
    JOIN Category c ON p.category_id = c.id
    ${condition.length ? "WHERE " + condition.join(" AND ") : ""}
    GROUP BY c.id, c.name, p.id, p.Prod_name
    ORDER BY c.name ASC, total_sold DESC
  `, params);

  return rows;
}

/**
 * 🔹 getBestSellingProduct(period, { enterpriseId, userId })
 * ------------------------------------------------------------
 * Returns the single top product for a period.
 */
async function getBestSellingProduct(period = "month", { enterpriseId = null, userId = null } = {}) {
  let periodCondition = "";
  if (period === "day") periodCondition = "DATE(s.sale_date) = CURDATE()";
  else if (period === "week") periodCondition = "YEARWEEK(s.sale_date,1) = YEARWEEK(CURDATE(),1)";
  else if (period === "month") periodCondition = "YEAR(s.sale_date) = YEAR(CURDATE()) AND MONTH(s.sale_date) = MONTH(CURDATE())";

  let condition = [periodCondition];
  let params = [];

  if (enterpriseId) {
    condition.push("p.entreprise_id = ?");
    params.push(enterpriseId);
  } else if (userId) {
    const enterpriseIds = await getUserEnterpriseIds(userId);
    if (enterpriseIds.length === 0) return null;
    condition.push(`p.entreprise_id IN (${enterpriseIds.map(() => "?").join(",")})`);
    params.push(...enterpriseIds);
  }

  const [rows] = await pool.query(`
    SELECT p.id, p.Prod_name, SUM(s.quantity_sold) AS total_sold
    FROM Sales s
    JOIN Product p ON s.product_id = p.id
    WHERE ${condition.join(" AND ")}
    GROUP BY p.id, p.Prod_name
    ORDER BY total_sold DESC
    LIMIT 1
  `, params);

  return rows[0] || null;
}

/**
 * 🔹 getRevenueByPeriod(period, { enterpriseId, userId })
 * ------------------------------------------------------------
 * Calculates total revenue for a period (day/month/year)
 */
async function getRevenueByPeriod(period = "day", { enterpriseId = null, userId = null } = {}) {
  let condition = [];
  let params = [];

  if (period === "day") condition.push("DATE(s.sale_date) = CURDATE()");
  else if (period === "month") condition.push("YEAR(s.sale_date) = YEAR(CURDATE()) AND MONTH(s.sale_date) = MONTH(CURDATE())");
  else if (period === "year") condition.push("YEAR(s.sale_date) = YEAR(CURDATE())");

  if (enterpriseId) {
    condition.push("p.entreprise_id = ?");
    params.push(enterpriseId);
  } else if (userId) {
    const enterpriseIds = await getUserEnterpriseIds(userId);
    if (enterpriseIds.length === 0) return 0;
    condition.push(`p.entreprise_id IN (${enterpriseIds.map(() => "?").join(",")})`);
    params.push(...enterpriseIds);
  }

  const [rows] = await pool.query(`
    SELECT SUM(s.total_price) AS total_revenue
    FROM Sales s
    JOIN Product p ON s.product_id = p.id
    ${condition.length ? "WHERE " + condition.join(" AND ") : ""}
  `, params);

  return rows[0].total_revenue || 0;
}

/**
 * 🔹 getProfitByPeriod(period, { enterpriseId, userId })
 * ------------------------------------------------------------
 * Calculates total profit: SUM(quantity_sold * (selling_price - cost_price))
 */
async function getProfitByPeriod(period = "month", { enterpriseId = null, userId = null } = {}) {
  let condition = [];
  let params = [];

  if (period === "day") condition.push("DATE(s.sale_date) = CURDATE()");
  else if (period === "month") condition.push("YEAR(s.sale_date) = YEAR(CURDATE()) AND MONTH(s.sale_date) = MONTH(CURDATE())");
  else if (period === "year") condition.push("YEAR(s.sale_date) = YEAR(CURDATE())");

  if (enterpriseId) {
    condition.push("p.entreprise_id = ?");
    params.push(enterpriseId);
  } else if (userId) {
    const enterpriseIds = await getUserEnterpriseIds(userId);
    if (enterpriseIds.length === 0) return 0;
    condition.push(`p.entreprise_id IN (${enterpriseIds.map(() => "?").join(",")})`);
    params.push(...enterpriseIds);
  }

  const [rows] = await pool.query(`
    SELECT SUM(s.quantity_sold * (p.selling_price - p.cost_price)) AS total_profit
    FROM Sales s
    JOIN Product p ON s.product_id = p.id
    ${condition.length ? "WHERE " + condition.join(" AND ") : ""}
  `, params);

  return rows[0].total_profit || 0;
}

/**
 * 🔹 compareSales(period, { enterpriseId, userId })
 * ------------------------------------------------------------
 * Compare current period vs previous period revenue.
 */
async function compareSales(period = "month", { enterpriseId = null, userId = null } = {}) {
  let currentQuery = "";
  let previousQuery = "";
  let paramsCurrent = [];
  let paramsPrevious = [];

  if (period === "day") {
    currentQuery = "DATE(s.sale_date) = CURDATE()";
    previousQuery = "DATE(s.sale_date) = CURDATE() - INTERVAL 1 DAY";
  } else if (period === "month") {
    currentQuery = "YEAR(s.sale_date) = YEAR(CURDATE()) AND MONTH(s.sale_date) = MONTH(CURDATE())";
    previousQuery = "YEAR(s.sale_date) = YEAR(CURDATE() - INTERVAL 1 MONTH) AND MONTH(s.sale_date) = MONTH(CURDATE() - INTERVAL 1 MONTH)";
  }

  if (enterpriseId) {
    currentQuery += " AND p.entreprise_id = ?";
    previousQuery += " AND p.entreprise_id = ?";
    paramsCurrent.push(enterpriseId);
    paramsPrevious.push(enterpriseId);
  } else if (userId) {
    const enterpriseIds = await getUserEnterpriseIds(userId);
    if (enterpriseIds.length === 0) return { currentTotal: 0, previousTotal: 0, growth: 0 };
    const placeholders = enterpriseIds.map(() => "?").join(",");
    currentQuery += ` AND p.entreprise_id IN (${placeholders})`;
    previousQuery += ` AND p.entreprise_id IN (${placeholders})`;
    paramsCurrent.push(...enterpriseIds);
    paramsPrevious.push(...enterpriseIds);
  }

  const [current] = await pool.query(
    `SELECT SUM(s.total_price) AS current_total FROM Sales s JOIN Product p ON s.product_id = p.id WHERE ${currentQuery}`,
    paramsCurrent
  );
  const [previous] = await pool.query(
    `SELECT SUM(s.total_price) AS previous_total FROM Sales s JOIN Product p ON s.product_id = p.id WHERE ${previousQuery}`,
    paramsPrevious
  );

  const currentTotal = current[0].current_total || 0;
  const previousTotal = previous[0].previous_total || 0;
  const growth = previousTotal ? ((currentTotal - previousTotal) / previousTotal) * 100 : 0;

  return { currentTotal, previousTotal, growth };
}

/**
 * 🔹 getQuarterlySales({ enterpriseId, userId })
 * ------------------------------------------------------------
 * Returns total sales per quarter (Q1-Q4), optionally filtered by enterprise/user
 */
async function getQuarterlySales({ enterpriseId = null, userId = null } = {}) {
  let condition = [];
  let params = [];

  if (enterpriseId) {
    condition.push("p.entreprise_id = ?");
    params.push(enterpriseId);
  } else if (userId) {
    const enterpriseIds = await getUserEnterpriseIds(userId);
    if (enterpriseIds.length === 0) return [];
    condition.push(`p.entreprise_id IN (${enterpriseIds.map(() => "?").join(",")})`);
    params.push(...enterpriseIds);
  }

  const [rows] = await pool.query(`
    SELECT QUARTER(s.sale_date) AS quarter, YEAR(s.sale_date) AS year, SUM(s.total_price) AS total_sales
    FROM Sales s
    JOIN Product p ON s.product_id = p.id
    ${condition.length ? "WHERE " + condition.join(" AND ") : ""}
    GROUP BY year, quarter
    ORDER BY year DESC, quarter DESC
  `, params);

  return rows;
}

/**
 * 🔹 getSalesTrend(period = "month", { enterpriseId, userId })
 * ------------------------------------------------------------
 * Returns revenue trends by day or month for charts.
 */
async function getSalesTrend(period = "month", { enterpriseId = null, userId = null } = {}) {
  let groupFormat = "%Y-%m-%d";
  let interval = "DAY";

  if (period === "year") {
    groupFormat = "%Y-%m";
    interval = "MONTH";
  }

  let condition = [];
  let params = [];

  if (enterpriseId) {
    condition.push("p.entreprise_id = ?");
    params.push(enterpriseId);
  } else if (userId) {
    const enterpriseIds = await getUserEnterpriseIds(userId);
    if (enterpriseIds.length === 0) return [];
    condition.push(`p.entreprise_id IN (${enterpriseIds.map(() => "?").join(",")})`);
    params.push(...enterpriseIds);
  }

  const [rows] = await pool.query(`
    SELECT DATE_FORMAT(s.sale_date, '${groupFormat}') AS label, SUM(s.total_price) AS revenue
    FROM Sales s
    JOIN Product p ON s.product_id = p.id
    ${condition.length ? "WHERE " + condition.join(" AND ") : ""}
    GROUP BY label
    ORDER BY label ASC
  `, params);

  return rows;
}

/**
 * 🔹 getRevenueByCategory({ enterpriseId, userId })
 * ------------------------------------------------------------
 * Returns revenue breakdown by product category.
 */
async function getRevenueByCategory({ enterpriseId = null, userId = null } = {}) {
  let condition = [];
  let params = [];

  if (enterpriseId) {
    condition.push("p.entreprise_id = ?");
    params.push(enterpriseId);
  } else if (userId) {
    const enterpriseIds = await getUserEnterpriseIds(userId);
    if (enterpriseIds.length === 0) return [];
    condition.push(`p.entreprise_id IN (${enterpriseIds.map(() => "?").join(",")})`);
    params.push(...enterpriseIds);
  }

  const [rows] = await pool.query(`
    SELECT c.name AS category_name, SUM(s.total_price) AS revenue
    FROM Sales s
    JOIN Product p ON s.product_id = p.id
    JOIN Category c ON p.category_id = c.id
    ${condition.length ? "WHERE " + condition.join(" AND ") : ""}
    GROUP BY c.id, c.name
    ORDER BY revenue DESC
  `, params);

  return rows;
}


/**
 * 🔹 Récupère le nombre de produits par catégorie pour une entreprise donnée
 * @param {number} entrepriseId - ID de l'entreprise
 * @returns {Promise<Array>} Liste des catégories avec le total de produits
 */
 async function getProductDistributionByCategory(entrepriseId) {
  const [rows] = await pool.query(
    `
    SELECT 
      c.id AS category_id,
      c.name AS category_name,
      COUNT(p.id) AS total_products
    FROM Category c
    LEFT JOIN Product p ON p.category_id = c.id
    WHERE c.entreprise_id = ?
    GROUP BY c.id
    ORDER BY total_products DESC
    `,
    [entrepriseId]
  )
  return rows
}

// ============================================================
// ✅ EXPORTS
// ============================================================
module.exports = {
  getUserEnterpriseIds,
  getProductSalesStats,
  getSalesReportByPeriod,
  getBestCategory,
  bestProductByCategory,
  getBestSellingProduct,
  getRevenueByPeriod,
  getProfitByPeriod,
  compareSales,
  getQuarterlySales,
  getSalesTrend,
  getRevenueByCategory,
  getProductDistributionByCategory
};
