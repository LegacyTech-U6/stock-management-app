const sequelizeQuery = require("sequelize-query");
const db = require("../config/db"); // ton index.js avec tous tes modèles
const { Op } = require("sequelize");
const { body } = require("express-validator");

const Client = db.Client;
const queryParser = sequelizeQuery(db);

// ===============================
// 🔹 Récupérer tous les clients
// ===============================
exports.getAllClients = async (req, res) => {
  try {
    const query = await queryParser.parse(req);

    // Filtrer par entreprise
    if (req.user || req.entrepriseId) {
      query.where = { ...query.where, entreprise_id: req.entrepriseId };
    }

    const data = await Client.findAll({
      ...query,
      attributes: { exclude: [] }, // ou ['id'] si tu veux cacher certaines infos
    });

    const count = await Client.count({
      where: query.where,
    });

    res.status(200).json({ count, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Récupérer un client par ID
// ===============================
exports.getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findOne({
      where: { id, entreprise_id: req.entrepriseId },
    });

    if (!client) return res.status(404).json({ message: "Client non trouvé" });
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Créer un client
// ===============================
exports.createClient = async (req, res) => {
  try {
    console.log('====================================');
    console.log(req.body , req.entrepriseId);
    console.log('====================================');
    const entrepriseId = req.entrepriseId;
    const clientData = { ...req.body, entreprise_id: entrepriseId };
    const client = await Client.create(clientData);
    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Mettre à jour un client
// ===============================
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const entrepriseId = req.user.entrepriseId;

    const [updated] = await Client.update(req.body, {
      where: { id, entreprise_id: entrepriseId },
    });

    if (!updated) return res.status(404).json({ message: "Client non trouvé" });
    res.status(200).json({ message: "Client mis à jour avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Supprimer un client
// ===============================
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const entrepriseId = req.user.entrepriseId;

    const deleted = await Client.destroy({
      where: { id, entreprise_id: entrepriseId },
    });

    if (!deleted) return res.status(404).json({ message: "Client non trouvé" });
    res.status(200).json({ message: "Client supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
