const db = require("../config/db");
const Activity = db.activities;

exports.getAllActivities = async (req, res) => {
  try {
    const entreprise_id = req.entrepriseId;

    const activities = await Activity.findAll({
      where: { entreprise_id, entity_type: 'Product' },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["id", "username", "email"] // nom de l'utilisateur
        },
        {
          model: db.Product,
          as: "product",
          attributes: ["id", "Prod_name"] // nom du produit
        }
      ]
    });

    res.status(200).json({ success: true, count: activities.length, activities });
  } catch (err) {
    console.error("🔥 Erreur getAllActivities:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
