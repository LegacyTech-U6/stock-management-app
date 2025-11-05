const sequelizeQuery = require("sequelize-query");
const db = require("../config/db"); // ton index.js avec tous tes modèles
const { Op } = require("sequelize");
const { body } = require("express-validator");
const { sendNotification } = require('../utils/notification');

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

    const clientdata = await Client.findAll({
      ...query,
      attributes: { exclude: [] }, // ou ['id'] si tu veux cacher certaines infos
    });
    const data = clientdata.map((p) => {
      const EntJSON = p.toJSON();
      if (EntJSON.logo_url) {
        EntJSON.logo_url = `${BASE_URL}${EntJSON.logo_url}`;
      }
      return EntJSON;
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
// 🔹 Create a client
// ===============================
exports.createClient = async (req, res) => {
  try {
    const entrepriseId = req.entrepriseId;
    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const clientData = {
      ...req.body,
      entreprise_id: entrepriseId,
      image: imagePath,
    };

    const client = await Client.create(clientData);

    // ✅ Send notification
    await sendNotification({
      type: 'client',
      message: `New client created: ${client.name}`,
      user_id: req.user?.id,
    });

    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Update a client
// ===============================
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const entrepriseId = req.user.entrepriseId;

    const client = await Client.findOne({
      where: { id, entreprise_id: entrepriseId },
    });

    if (!client) return res.status(404).json({ message: "Client not found" });

    if (req.file) {
      // Remove old image if exists
      if (client.image) {
        const oldPath = path.join(process.cwd(), client.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      req.body.image = `/uploads/${req.file.filename}`;
    }

    const [updated] = await Client.update(req.body, {
      where: { id, entreprise_id: entrepriseId },
    });

    if (!updated) return res.status(404).json({ message: "Client not found" });

    // ✅ Send notification
    await sendNotification({
      type: 'client',
      message: `Client updated: ${client.name}`,
      user_id: req.user?.id,
    });

    res.status(200).json({ message: "Client updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Delete a client
// ===============================
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const entrepriseId = req.user.entrepriseId;

    const deleted = await Client.destroy({
      where: { id, entreprise_id: entrepriseId },
    });

    if (!deleted) return res.status(404).json({ message: "Client not found" });

    // ✅ Send notification
    await sendNotification({
      type: 'client',
      message: `Client deleted (ID: ${id})`,
      user_id: req.user?.id,
    });

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
