// backend/controllers/entreprise.controller.js
require("dotenv").config();
const sequelizeQuery = require("sequelize-query");
const db = require("../config/db"); // ton index.js avec tous tes modèles
const Entreprise = db.Entreprise; // Sequelize model si tu l'as défini, sinon tu peux adapter
const fs = require("fs");
const path = require("path");
const queryParser = sequelizeQuery(db);
const BASE_URL = process.env.BASE_URL;
// ===============================
// 🔹 Récupérer toutes les entreprises d’un utilisateur
// ===============================
exports.getAllEntreprises = async (req, res) => {
  try {
    const query = await queryParser.parse(req);

    if (req.user && req.user.id) {
      query.where = { ...query.where, user_id: req.user.id };
    }

    const entreprise = await Entreprise.findAll({
      ...query,
      attributes: { exclude: [] },
    });
    const data = entreprise.map((p) => {
      const EntJSON = p.toJSON();
      if (EntJSON.logo_url) {
        EntJSON.logo_url = `${BASE_URL}${EntJSON.logo_url}`;
      }
      return EntJSON;
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
      return res.status(404).json({ message: "Entreprise non trouvée" });

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
  
    // ✅ Si une image a été uploadée, on génère son URL publique
    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }
    const data = {
      ...req.body,
      user_id,
      logo_url: imagePath,
    };
    const entreprise = await Entreprise.create(data);

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
      return res.status(404).json({ message: "Entreprise non trouvée" });

    res.status(200).json({ message: "Entreprise mise à jour avec succès" });
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
      return res.status(404).json({ message: "Entreprise non trouvée" });

    res.status(200).json({ message: "Entreprise supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
