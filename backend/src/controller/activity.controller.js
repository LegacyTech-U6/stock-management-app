const db = require("../config/db");


exports.getAllActivities = async (req, res) => {
  try {
    const entreprise_id = req.entrepriseId;
    console.log('====================================');
    console.log("entreprise id", entreprise_id);
    console.log('====================================');
    const activities = await db.activities.findAll({
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
    console.log('====================================');
    console.log("route activity called",activities );
    console.log('====================================');

    res.status(200).json({ success: true, count: activities.length, activities });
  } catch (err) {
    console.error("🔥 Erreur getAllActivities:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
