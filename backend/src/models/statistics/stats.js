const { Product, Sales, Client, Entreprise, Sequelize } = require("../../config/db");
const { Op, fn, col, literal } = Sequelize;
const db =require("../../config/db");
const { sequelize } = require('../../config/db'); // Ajuste selon ton projet // tes modèles Sequelize
function formatDate(date) {
  // Convertit une date JS en "YYYY-MM-DD HH:MM:SS"
  return date.toISOString().slice(0, 19).replace('T', ' ');
}
// 🔹 Récupère les IDs d'entreprise d'un utilisateur
async function getEnterpriseIds(userId) {
  if (!userId) return [];
  const enterprises = await Entreprise.findAll({
    where: { user_id: userId },
    attributes: ['id']
  });
  return enterprises.map(e => e.id);
}

// 🔹 Prépare le filtre entreprise/user
async function getFilter({ userId, enterpriseId }) {
  if (enterpriseId) return { entreprise_id: enterpriseId };
  if (userId) {
    const ids = await getEnterpriseIds(userId);
    return ids.length ? { entreprise_id: ids } : null;
  }
  return null;
}

// 🔹 Formater la date selon la période
function getDateFormat(period) {
  switch (period) {
    case "day": return "%Y-%m-%d";
    case "week": return "%x-%v";
    case "month": return "%Y-%m";
    case "year": return "%Y";
    default: return "%Y-%m";
  }
}

// 🔹 Calcul de la croissance %
function computeGrowth(history) {
  for (let i = 1; i < history.length; i++) {
    const prev = history[i - 1].value;
    const curr = history[i].value;
    history[i].growth_percent = prev > 0 ? ((curr - prev) / prev) * 100 : 0;
  }
  if (history.length) history[0].growth_percent = 0;
  return history;
}

// 🔹 Stats ventes
async function getSales({ userId, enterpriseId, period = "month" }) {
  const filter = await getFilter({ userId, enterpriseId });
  if (filter === null) return { total: 0, history: [] };

  const dateFormat = getDateFormat(period);

  const rows = await Sales.findAll({
    include: { model: Product, as: 'product', where: filter, attributes: [] },
    attributes: [
      [fn('DATE_FORMAT', col('sale_date'), dateFormat), 'period'],
      [fn('SUM', col('total_price')), 'value']
    ],
    group: ['period'],
    order: [['period', 'ASC']]
  });

  const history = rows.map(r => ({ period: r.dataValues.period, value: Number(r.dataValues.value), growth_percent: 0 }));
  const total = history.reduce((a, h) => a + h.value, 0);
  return { total, history: computeGrowth(history) };
}

// 🔹 Stats profit
async function getProfit({ userId, enterpriseId, period = "month" }) {
  const filter = await getFilter({ userId, enterpriseId });
  if (filter === null) return { total: 0, history: [] };

  const dateFormat = getDateFormat(period);

  const rows = await Sales.findAll({
    include: { model: Product ,as: 'product', where: filter, attributes: [] },
    attributes: [
      [fn('DATE_FORMAT', col('sale_date'), dateFormat), 'period'],
      [fn('SUM', literal('quantity_sold * (selling_price - cost_price)')), 'value']
    ],
    group: ['period'],
    order: [['period', 'ASC']]
  });

  const history = rows.map(r => ({ period: r.dataValues.period, value: Number(r.dataValues.value), growth_percent: 0 }));
  const total = history.reduce((a, h) => a + h.value, 0);
  return { total, history: computeGrowth(history) };
}

// 🔹 Stats clients
async function getClients({ userId, enterpriseId, period = "month" }) {
  const filter = await getFilter({ userId, enterpriseId });
  if (filter === null) return { total: 0, history: [] };

  const dateFormat = getDateFormat(period);

  const rows = await Client.findAll({
    where: filter,
    attributes: [
      [fn('DATE_FORMAT', col('createdAt'), dateFormat), 'period'],
      [fn('COUNT', col('id')), 'value']
    ],
    group: ['period'],
    order: [['period', 'ASC']]
  });

  const history = rows.map(r => ({ period: r.dataValues.period, value: Number(r.dataValues.value), growth_percent: 0 }));
  const total = history.reduce((a, h) => a + h.value, 0);
  return { total, history: computeGrowth(history) };
}




/**
 * 🔹 Récupère les meilleurs produits vendus
 * avec possibilité d'inclure le pourcentage d’évolution (trend)
 */


async function getTopProducts({
  userId,
  enterpriseId,
  limit = 10,
  period = 'month'
}) {
  // 1️⃣ Filtrage entreprise / utilisateur
  let entrepriseIds = [];
  if (enterpriseId) {
    entrepriseIds = [enterpriseId];
  } else if (userId) {
    const entreprises = await db.Entreprise.findAll({
      where: { user_id: userId },
      attributes: ['id'],
    });
    entrepriseIds = entreprises.map(e => e.id);
  }

  if (entrepriseIds.length === 0) return [];

  // 2️⃣ Définir la période
  const now = new Date();
  let startDate, endDate;

  if (period === 'day') {
    startDate = new Date(now.setHours(0, 0, 0, 0));
    endDate = new Date(now.setHours(23, 59, 59, 999));
  } else if (period === 'week') {
    const day = now.getDay();
    startDate = new Date(now);
    startDate.setDate(now.getDate() - day);
    endDate = new Date();
  } else { // month
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  }

  const start = formatDate(startDate);
  const end = formatDate(endDate);

  try {
    // 3️⃣ Requête principale en SQL brut
    const products = await sequelize.query(`
      SELECT 
        p.id,
        p.Prod_name,
        p.Prod_image,
        p.cost_price,
        p.selling_price,
        p.quantity,
        IFNULL(SUM(s.quantity_sold),0) AS total_sold,
        IFNULL(SUM(s.total_price),0) AS total_revenue,
        IFNULL(SUM(s.total_profit),0) AS total_profit
      FROM Products p
      LEFT JOIN Sales s 
        ON p.id = s.product_id 
        AND s.sale_date BETWEEN :start AND :end
      WHERE p.entreprise_id IN (:entrepriseIds)
      GROUP BY p.id
      ORDER BY total_sold DESC
      LIMIT :limit
    `, {
      replacements: { start, end, entrepriseIds, limit },
      type: sequelize.QueryTypes.SELECT
    });

    // 4️⃣ Formatage final
    return products.map(p => ({
      id: p.id,
      name: p.Prod_name,
      image: p.Prod_image,
      cost_price: Number(p.cost_price),
      selling_price: Number(p.selling_price),
      quantity: Number(p.quantity),
      total_sold: Number(p.total_sold),
      total_revenue: Number(p.total_revenue) || 0,
      total_profit: Number(p.total_profit) || 0,
    }));

  } catch (err) {
    console.error('Erreur SQL dans getTopProducts:', err);
    throw err;
  }
}

module.exports = {
  getSales,
  getProfit,
  getClients,
  getTopProducts
};
