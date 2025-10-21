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
async function getProductSalesStats({ enterpriseId = null, userId = null, period = "day" } = {}) {
  let condition = [];
  let params = [];

  // Filter by enterprise or user's enterprises
  if (enterpriseId) {
    condition.push("p.entreprise_id = ?");
    params.push(enterpriseId);
  } else if (userId) {
    const enterpriseIds = await getUserEnterpriseIds(userId);
    if (enterpriseIds.length === 0) return [];
    condition.push(`p.entreprise_id IN (${enterpriseIds.map(() => "?").join(",")})`);
    params.push(...enterpriseIds);
  }

  // Determine date format based on period
  let dateFormat;
  switch (period) {
    case "day":
      dateFormat = "%Y-%m-%d";
      break;
    case "week":
      dateFormat = "%x-%v"; // YEAR-WEEK
      break;
    case "month":
      dateFormat = "%Y-%m";
      break;
    case "year":
      dateFormat = "%Y";
      break;
    default:
      dateFormat = "%Y-%m";
  }

  // Main query: aggregate sales per product per period
  const [rows] = await pool.query(
    `
    SELECT
      e.name AS enterprise_name,
      c.name AS category_name,
      p.id AS product_id,
      p.Prod_name,
      DATE_FORMAT(s.sale_date, '${dateFormat}') AS period_label,
      SUM(s.quantity_sold) AS total_sold,
      SUM(s.quantity_sold * p.selling_price) AS total_revenue
    FROM Sales s
    JOIN Product p ON s.product_id = p.id
    JOIN Entreprises e ON p.entreprise_id = e.id
    LEFT JOIN Category c ON p.category_id = c.id
    ${condition.length ? "WHERE " + condition.join(" AND ") : ""}
    GROUP BY p.id, p.Prod_name, e.name, c.name, period_label
    ORDER BY p.id, period_label
    `,
    params
  );

  // Transform into structured products
  let productsMap = {};

  rows.forEach(row => {
    const key = row.product_id;

    if (!productsMap[key]) {
      productsMap[key] = {
        product_id: row.product_id,
        Prod_name: row.Prod_name,
        enterprise_name: row.enterprise_name,
        category_name: row.category_name,
        total_sold: 0,
        total_revenue: 0,
        sales_history: []
      };
    }

    // ✅ Force numeric addition to avoid string concatenation
    const sold = Number(row.total_sold || 0);
    const revenue = Number(row.total_revenue || 0);

    productsMap[key].total_sold += sold;
    productsMap[key].total_revenue += revenue;

    productsMap[key].sales_history.push({
      period: row.period_label,
      sold,
      revenue
    });
  });

  // Calculate percentage growth per period and overall
  Object.values(productsMap).forEach(product => {
    const history = product.sales_history;

    for (let i = 1; i < history.length; i++) {
      const prev = history[i - 1].sold;
      const current = history[i].sold;
      history[i].growth_percent = prev > 0 ? ((current - prev) / prev) * 100 : 0;
    }

    if (history.length) history[0].growth_percent = 0;

    product.overall_growth_percent = history.length > 1
      ? ((history[history.length - 1].sold - history[0].sold) / history[0].sold) * 100
      : 0;
  });

  // Rank products by total sold in selected period
  const rankedProducts = Object.values(productsMap).sort((a, b) => b.total_sold - a.total_sold);

  return rankedProducts;
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

  // 1️⃣ Filter by period
  if (period === "day") condition.push("DATE(s.sale_date) = CURDATE()");
  else if (period === "week") condition.push("YEARWEEK(s.sale_date,1) = YEARWEEK(CURDATE(),1)");
  else if (period === "month") condition.push("YEAR(s.sale_date) = YEAR(CURDATE()) AND MONTH(s.sale_date) = MONTH(CURDATE())");

  // 2️⃣ Filter by enterprise or user's enterprises
  if (enterpriseId) {
    condition.push("p.entreprise_id = ?");
    params.push(enterpriseId);
  } else if (userId) {
    const enterpriseIds = await getUserEnterpriseIds(userId);
    if (enterpriseIds.length === 0) return [];
    condition.push(`p.entreprise_id IN (${enterpriseIds.map(() => "?").join(",")})`);
    params.push(...enterpriseIds);
  }

  // 3️⃣ SQL query
  const [rows] = await pool.query(`
    SELECT 
      s.sale_date,
      p.id AS product_id,
      p.Prod_name,
      p.cost_price,
      p.selling_price,
      SUM(s.quantity_sold) AS total_sold,
      SUM(s.quantity_sold * p.cost_price) AS total_cost,
      SUM(s.quantity_sold * p.selling_price) AS total_revenue,
      SUM(s.quantity_sold * (p.selling_price - p.cost_price)) AS total_profit
    FROM Sales s
    JOIN Product p ON s.product_id = p.id
    ${condition.length ? "WHERE " + condition.join(" AND ") : ""}
    GROUP BY s.sale_date, p.id, p.Prod_name, p.cost_price, p.selling_price
    ORDER BY s.sale_date, total_sold DESC
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
/**
 * 🔹 getRevenueByPeriod
 * ------------------------------------------------------------
 * Returns total revenue + history + trend % per period
 */
async function getRevenueByPeriod(period = "month", { enterpriseId = null, userId = null } = {}) {
  let condition = [];
  let params = [];

  // Determine SQL date format
  let dateFormat;
  switch (period) {
    case "day": dateFormat = "%Y-%m-%d"; break;
    case "week": dateFormat = "%x-%v"; break; // YEAR-WEEK
    case "month": dateFormat = "%Y-%m"; break;
    case "year": dateFormat = "%Y"; break;
    default: dateFormat = "%Y-%m";
  }

  // Enterprise/User filter
  if (enterpriseId) {
    condition.push("p.entreprise_id = ?");
    params.push(enterpriseId);
  } else if (userId) {
    const enterpriseIds = await getUserEnterpriseIds(userId);
    if (enterpriseIds.length === 0) return { total: 0, overall_growth_percent: 0, history: [] };
    condition.push(`p.entreprise_id IN (${enterpriseIds.map(() => "?").join(",")})`);
    params.push(...enterpriseIds);
  }

  // Query revenue grouped by period
  const [rows] = await pool.query(`
    SELECT
      DATE_FORMAT(s.sale_date, '${dateFormat}') AS period_label,
      SUM(s.total_price) AS total_revenue
    FROM Sales s
    JOIN Product p ON s.product_id = p.id
    ${condition.length ? "WHERE " + condition.join(" AND ") : ""}
    GROUP BY period_label
    ORDER BY period_label
  `, params);

  // Build history + growth %
  const history = rows.map(r => ({
    period: r.period_label,
    value: Number(r.total_revenue) || 0,
    growth_percent: 0
  }));

  for (let i = 1; i < history.length; i++) {
    const prev = history[i - 1].value;
    const current = history[i].value;
    history[i].growth_percent = prev > 0 ? ((current - prev) / prev) * 100 : 0;
  }

  const total = history.reduce((sum, h) => sum + h.value, 0);
  const overall_growth_percent = history.length > 1
    ? ((history[history.length - 1].value - history[0].value) / (history[0].value || 1)) * 100
    : 0;

  return { total, overall_growth_percent, history };
}

/**
 * 🔹 getProfitByPeriod
 * ------------------------------------------------------------
 * Returns total profit + history + trend % per period
 */
async function getProfitByPeriod(period = "day", { enterpriseId = null, userId = null } = {}) {
  let condition = [];
  let params = [];

  // Determine SQL date format
  let dateFormat;
  switch (period) {
    case "day": dateFormat = "%Y-%m-%d"; break;
    case "week": dateFormat = "%x-%v"; break;
    case "month": dateFormat = "%Y-%m"; break;
    case "year": dateFormat = "%Y"; break;
    default: dateFormat = "%Y-%m";
  }

  // Enterprise/User filter
  if (enterpriseId) {
    condition.push("p.entreprise_id = ?");
    params.push(enterpriseId);
  } else if (userId) {
    const enterpriseIds = await getUserEnterpriseIds(userId);
    if (enterpriseIds.length === 0) return { total: 0, overall_growth_percent: 0, history: [] };
    condition.push(`p.entreprise_id IN (${enterpriseIds.map(() => "?").join(",")})`);
    params.push(...enterpriseIds);
  }

  // Query profit grouped by period
  const [rows] = await pool.query(`
    SELECT
      DATE_FORMAT(s.sale_date, '${dateFormat}') AS period_label,
      SUM(s.quantity_sold * (p.selling_price - p.cost_price)) AS total_profit
    FROM Sales s
    JOIN Product p ON s.product_id = p.id
    ${condition.length ? "WHERE " + condition.join(" AND ") : ""}
    GROUP BY period_label
    ORDER BY period_label
  `, params);

  // Build history + growth %
  const history = rows.map(r => ({
    period: r.period_label,
    value: Number(r.total_profit) || 0,
    growth_percent: 0
  }));

  for (let i = 1; i < history.length; i++) {
    const prev = history[i - 1].value;
    const current = history[i].value;
    history[i].growth_percent = prev > 0 ? ((current - prev) / prev) * 100 : 0;
  }

  const total = history.reduce((sum, h) => sum + h.value, 0);
  const overall_growth_percent = history.length > 1
    ? ((history[history.length - 1].value - history[0].value) / (history[0].value || 1)) * 100
    : 0;

  return { total, overall_growth_percent, history };
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
