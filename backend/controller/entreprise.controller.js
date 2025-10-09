// backend/controllers/entreprise.controller.js
const Entreprise = require('../models/Entreprise');

exports.createEntreprise = async (req, res) => {
  try {
    const user_id = req.user.id; // récupéré via middleware auth
    const { name, description, logo_url } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Le nom de l'entreprise est requis" });
    }

    const entreprise = await Entreprise.create({ user_id, name, description, logo_url });
    res.status(201).json({ message: "Entreprise créée avec succès", entreprise });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la création" });
  }
};

exports.getEntreprises = async (req, res) => {
  try {
    const user_id = req.user.id;
    const entreprises = await Entreprise.getAllByUser(user_id);
    res.json({ entreprises });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération" });
  }
};

exports.getEntrepriseById = async (req, res) => {
  try {
    const entreprise = await Entreprise.getById(req.params.id);
    if (!entreprise) {
      return res.status(404).json({ message: "Entreprise non trouvée" });
    }
    res.json({ entreprise });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.updateEntreprise = async (req, res) => {
  try {
    const { name, description, logo_url } = req.body;
    await Entreprise.update(req.params.id, { name, description, logo_url });
    res.json({ message: "Entreprise mise à jour avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la mise à jour" });
  }
};

exports.deleteEntreprise = async (req, res) => {
  try {
    await Entreprise.delete(req.params.id);
    res.json({ message: "Entreprise supprimée avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la suppression" });
  }
};
