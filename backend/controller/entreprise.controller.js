// backend/controllers/entreprise.controller.js
const sequelizeQuery = require('sequelize-query');
const db = require('../config/db'); // ton index.js avec tous tes modèles
const Entreprise = db.Entreprise; // Sequelize model si tu l'as défini, sinon tu peux adapter

const queryParser = sequelizeQuery(db);

// ===============================
// 🔹 Récupérer toutes les entreprises d’un utilisateur
// ===============================
exports.getAllEntreprises = async (req, res) => {
  try {
    const query = await queryParser.parse(req);

    if (req.user && req.user.id) {
      query.where = { ...query.where, user_id: req.user.id };
    }

    const data = await Entreprise.findAll({
      ...query,
      attributes: { exclude: [] },
    });

    const count = await Entreprise.count({
      where: query.where,
    });

    res.status(200).json({ count, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Récupérer une entreprise par UUID
// ===============================
exports.getEntrepriseByUuid = async (req, res) => {
  try {
    const { uuid } = req.params;

    const entreprise = await Entreprise.findOne({
      where: { uuid },
    });

    if (!entreprise)
      return res.status(404).json({ message: 'Entreprise non trouvée' });

    res.status(200).json(entreprise);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Créer une entreprise
// ===============================
exports.createEntreprise = async (req, res) => {
  try {
    const user_id = req.user.id; // l'utilisateur connecté
    const entrepriseData = { ...req.body, user_id };

    const entreprise = await Entreprise.create(entrepriseData);

    res.status(201).json(entreprise);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Mettre à jour une entreprise par UUID
// ===============================
exports.updateEntreprise = async (req, res) => {
  try {
    const { uuid } = req.params;

    const [updated] = await Entreprise.update(req.body, {
      where: { uuid },
    });

    if (!updated)
      return res.status(404).json({ message: 'Entreprise non trouvée' });

    res.status(200).json({ message: 'Entreprise mise à jour avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Supprimer une entreprise par UUID
// ===============================
exports.deleteEntreprise = async (req, res) => {
  try {
    const { uuid } = req.params;

    const deleted = await Entreprise.destroy({
      where: { uuid },
    });

    if (!deleted)
      return res.status(404).json({ message: 'Entreprise non trouvée' });

    res.status(200).json({ message: 'Entreprise supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
