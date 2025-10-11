const { get } = require("jquery");
const { pool } = require("../../config/db");

/**
 * ============================================================
 * 📊 PRODUCT & SALES STATISTICS MODEL
 * ------------------------------------------------------------
 * This module contains all SQL-based analytics for Stockly.
 * It computes sales KPIs (revenue, profit, trends, comparisons, etc.)
 * directly from the database using MySQL aggregate queries.
 * ============================================================
 */

/**
 * 🔹 getProductSalesStats()
 * ------------------------------------------------------------
 * Returns the total quantity sold for each product across all time.
 * Useful for showing the most sold products overall.
 */
async function getProductSalesStats() {
  const [rows] = await pool.query(`
    SELECT product_id, SUM(quantity_sold) AS total_sold
    FROM Sales
    GROUP BY product_id
    ORDER BY total_sold DESC
  `);
  return rows;
}

/**
 * 🔹 getSalesReportByPeriod(period)
 * ------------------------------------------------------------
 * Generates a sales summary (total quantity sold per product)
 * filtered by a specific time period:
 *  - "day" → today's sales
 *  - "week" → this week's sales
 *  - "month" → this month's sales
 */
async function getSalesReportByPeriod(period) {
  let query = `
    SELECT product_id, SUM(quantity_sold) AS total_sold
    FROM Sales
  `;
  let params = [];

  if (period === "day") {
    query += " WHERE DATE(sale_date) = CURDATE() ";
  } else if (period === "week") {
    query += " WHERE YEARWEEK(sale_date, 1) = YEARWEEK(CURDATE(), 1) ";
  } else if (period === "month") {
    query +=
      " WHERE YEAR(sale_date) = YEAR(CURDATE()) AND MONTH(sale_date) = MONTH(CURDATE()) ";
  }
  query += " GROUP BY product_id ORDER BY total_sold DESC";

  const [rows] = await pool.query(query, params);
  return rows;
}

/**
 * 🔹 getBestCategory()
 * ------------------------------------------------------------
 * Finds the best-performing category by total products sold.
 * Joins Category, Product, and Sales tables to compute totals.
 */
async function getBestCategory() {
  const [rows] = await pool.query(`
    SELECT 
      Category.id AS category_id,
      Category.name AS category_name,
      SUM(Sales.quantity_sold) AS total_quantity_sold
    FROM Category
    JOIN Product ON Category.id = Product.category_id
    JOIN Sales ON Product.id = Sales.product_id
    GROUP BY Category.id, Category.name
    ORDER BY total_quantity_sold DESC
  `);
  return rows;
}

/**
 * 🔹 bestProductByCategory(categoryId)
 * ------------------------------------------------------------
 * Returns all products within each category ordered by total sales.
 * You can pass a specific categoryId if you want to filter by it.
 */
async function bestProductByCategory(categoryId) {
  const [rows] = await pool.query(`
    SELECT 
      cat.id AS category_id,
      cat.name AS category_name,
      p.id AS product_id,
      p.Prod_name AS Product_name,
      SUM(s.quantity_sold) AS total_sold
    FROM Sales AS s
    JOIN Product AS p ON s.product_id = p.id
    JOIN Category AS cat ON p.category_id = cat.id
    GROUP BY cat.id, cat.name, p.id, p.Prod_name
    ORDER BY cat.name ASC, total_sold DESC
  `, [categoryId]);
  return rows;
}

/**
 * 🔹 getBestSellingProduct(period)
 * ------------------------------------------------------------
 * Returns the top 1 product with the highest total sales
 * within a given period (day, week, or month).
 */
async function getBestSellingProduct(period = "month") {
  let condition = "";
  if (period === "day") condition = "WHERE DATE(sale_date) = CURDATE()";
  else if (period === "week")
    condition = "WHERE YEARWEEK(sale_date, 1) = YEARWEEK(CURDATE(), 1)";
  else if (period === "month")
    condition =
      "WHERE YEAR(sale_date) = YEAR(CURDATE()) AND MONTH(sale_date) = MONTH(CURDATE())";

  const [rows] = await pool.query(`
    SELECT p.id, p.Prod_name, SUM(s.quantity_sold) AS total_sold
    FROM Sales s
    JOIN Product p ON s.product_id = p.id
    ${condition}
    GROUP BY p.id, p.Prod_name
    ORDER BY total_sold DESC
    LIMIT 1
  `);
  return rows[0];
}

/**
 * 🔹 getRevenueByPeriod(period)
 * ------------------------------------------------------------
 * Calculates the total revenue generated during a given period.
 * Assumes Sales.total_price is the total sale amount per record.
 */
async function getRevenueByPeriod(period = "day") {
  let condition = "";
  if (period === "day") condition = "WHERE DATE(sale_date) = CURDATE()";
  else if (period === "month")
    condition =
      "WHERE YEAR(sale_date) = YEAR(CURDATE()) AND MONTH(sale_date) = MONTH(CURDATE())";
  else if (period === "year")
    condition = "WHERE YEAR(sale_date) = YEAR(CURDATE())";

  const [rows] = await pool.query(`
    SELECT SUM(s.total_price) AS total_revenue
    FROM Sales s
    ${condition}
  `);
  return rows[0].total_revenue || 0;
}

/**
 * 🔹 getProfitByPeriod(period)
 * ------------------------------------------------------------
 * Calculates the total profit by subtracting cost price
 * from unit price for each product sold.
 * Requires Product.cost_price and Product.unit_price.
 */
async function getProfitByPeriod(period = "month") {
  let condition = "";
  if (period === "day") condition = "WHERE DATE(sale_date) = CURDATE()";
  else if (period === "month")
    condition =
      "WHERE YEAR(sale_date) = YEAR(CURDATE()) AND MONTH(sale_date) = MONTH(CURDATE())";
  else if (period === "year") condition = "WHERE YEAR(sale_date) = YEAR(CURDATE())";

  const [rows] = await pool.query(`
    SELECT 
      SUM(s.quantity_sold * (p.selling_price - p.cost_price)) AS total_profit
    FROM Sales s
    JOIN Product p ON s.product_id = p.id
    ${condition}
  `);
  return rows[0].total_profit || 0;
}


/**
 * 🔹 compareSales(period)
 * ------------------------------------------------------------
 * Compares total sales revenue of the current period
 * with the previous one (day vs yesterday, month vs last month).
 * Returns current, previous totals, and growth %.
 */
async function compareSales(period = "month") {
  let currentQuery = "";
  let previousQuery = "";

  if (period === "day") {
    currentQuery = "DATE(sale_date) = CURDATE()";
    previousQuery = "DATE(sale_date) = CURDATE() - INTERVAL 1 DAY";
  } else if (period === "month") {
    currentQuery =
      "YEAR(sale_date) = YEAR(CURDATE()) AND MONTH(sale_date) = MONTH(CURDATE())";
    previousQuery =
      "YEAR(sale_date) = YEAR(CURDATE() - INTERVAL 1 MONTH) AND MONTH(sale_date) = MONTH(CURDATE() - INTERVAL 1 MONTH)";
  }

  const [current] = await pool.query(
    `SELECT SUM(total_price) AS current_total FROM Sales WHERE ${currentQuery}`
  );
  const [previous] = await pool.query(
    `SELECT SUM(total_price) AS previous_total FROM Sales WHERE ${previousQuery}`
  );

  const currentTotal = current[0].current_total || 0;
  const previousTotal = previous[0].previous_total || 0;
  const growth = previousTotal
    ? ((currentTotal - previousTotal) / previousTotal) * 100
    : 0;

  return { currentTotal, previousTotal, growth };
}

/**
 * 🔹 getQuarterlySales()
 * ------------------------------------------------------------
 * Aggregates total sales by quarter (Q1–Q4) per year.
 * Useful for long-term business or seasonal trend analysis.
 */
async function getQuarterlySales() {
  const [rows] = await pool.query(`
    SELECT 
      QUARTER(sale_date) AS quarter,
      YEAR(sale_date) AS year,
      SUM(total_price) AS total_sales
    FROM Sales
    GROUP BY year, quarter
    ORDER BY year DESC, quarter DESC
  `);
  return rows;
}

/**
 * 🔹 getSalesTrend(period)
 * ------------------------------------------------------------
 * Returns a list of sales data grouped by day or month,
 * ready for chart visualization (line or bar graphs).
 * e.g. { label: "2025-10-10", revenue: 2300 }
 */
async function getSalesTrend(period = "month") {
  let groupFormat = "%Y-%m-%d";
  let interval = "DAY";

  if (period === "year") {
    groupFormat = "%Y-%m";
    interval = "MONTH";
  }

  const [rows] = await pool.query(`
    SELECT 
      DATE_FORMAT(sale_date, '${groupFormat}') AS label,
      SUM(total_price) AS revenue
    FROM Sales
    WHERE sale_date >= DATE_SUB(CURDATE(), INTERVAL 1 ${interval})
    GROUP BY label
    ORDER BY label ASC
  `);
  return rows;
}

/**
 * revenu breakdown by category
 * 
 */
async function getRevenueByCategory() {
  const [rows] = await pool.query(`
    SELECT 
      c.name AS category_name,
      SUM(s.total_price) AS revenue
    FROM Sales s
    JOIN Product p ON s.product_id = p.id
    JOIN Category c ON p.category_id = c.id
    GROUP BY c.id, c.name
    ORDER BY revenue DESC
  `);
  return rows;
}

/**
 * ============================================================
 * ✅ EXPORTS
 * ------------------------------------------------------------
 * Export all analytics methods for use in controllers.
 * ============================================================
 */
module.exports = {
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
  getRevenueByCategory
};
