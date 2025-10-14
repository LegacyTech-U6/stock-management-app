const Entreprise = require('../models/Entreprise');

// Créer une entreprise
exports.createEntreprise = async (req, res) => {
  try {
    const user_id = req.user.id;
    const data = req.body;

    if (!data.name) return res.status(400).json({ message: "Le nom est requis" });

    const entreprise = await Entreprise.create({ user_id, ...data });
    res.status(201).json({ message: "Entreprise créée", entreprise });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer toutes les entreprises d’un utilisateur
exports.getEntreprises = async (req, res) => {
  try {
    const entreprises = await Entreprise.getAllByUser(req.user.id);
    res.json({ entreprises });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer une entreprise par UUID
exports.getEntrepriseByUuid = async (req, res) => {
  try {
    const entreprise = await Entreprise.getByUuid(req.params.uuid);
    if (!entreprise) return res.status(404).json({ message: "Entreprise non trouvée" });
    res.json({ entreprise });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Mettre à jour par UUID
exports.updateEntreprise = async (req, res) => {
  try {
    await Entreprise.updateByUuid(req.params.uuid, req.body);
    res.json({ message: "Entreprise mise à jour" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Supprimer par UUID
exports.deleteEntreprise = async (req, res) => {
  try {
    await Entreprise.deleteByUuid(req.params.uuid);
    res.json({ message: "Entreprise supprimée" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
