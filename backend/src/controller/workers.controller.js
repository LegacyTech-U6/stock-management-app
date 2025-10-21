// backend/controllers/worker.controller.js
const sequelizeQuery = require("sequelize-query");
const db = require("../config/db"); // ton index.js où tous les modèles sont importés
const Worker = db.Worker; // Sequelize model
const Entreprise = db.Entreprise;
const Role = db.Role;
const { Op } = require("sequelize");

const queryParser = sequelizeQuery(db);

// ===============================
// 🔹 Récupérer tous les employés pour un utilisateur
// ===============================
exports.getAllWorkers = async (req, res) => {
  try {
    const query = await queryParser.parse(req);

    if (req.user && req.user.id) {
      query.where = { ...query.where, user_id: req.user.id };
    }

    const data = await Worker.findAll({
      ...query,
      include: [
        { model: Entreprise, attributes: ["id", "name", "description"] },
        { model: Role, attributes: ["id", "name"] },
      ],
    });

    const count = await Worker.count({ where: query.where });

    res.status(200).json({ count, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Récupérer un employé par ID
// ===============================
exports.getWorkerById = async (req, res) => {
  try {
    const { id } = req.params;

    const worker = await Worker.findOne({
      where: { id },
      include: [
        { model: Entreprise, attributes: ["id", "name", "description"] },
        { model: Role, attributes: ["id", "name"] },
      ],
    });

    if (!worker) return res.status(404).json({ message: "Employé non trouvé" });

    res.status(200).json(worker);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Créer un employé
// ===============================
exports.createWorker = async (req, res) => {
  try {
    const user_id = req.user.id;
    const workerData = { ...req.body, user_id };

    const worker = await Worker.create(workerData);

    res.status(201).json(worker);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Mettre à jour un employé
// ===============================
exports.updateWorker = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await Worker.update(req.body, {
      where: { id },
    });

    if (!updated)
      return res.status(404).json({ message: "Employé non trouvé" });

    res.status(200).json({ message: "Employé mis à jour avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Supprimer un employé
// ===============================
exports.deleteWorker = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Worker.destroy({
      where: { id },
    });

    if (!deleted)
      return res.status(404).json({ message: "Employé non trouvé" });

    res.status(200).json({ message: "Employé supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
