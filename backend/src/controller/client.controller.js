const sequelizeQuery = require("sequelize-query");
const db = require("../config/db");
const { sendNotification } = require('../utils/notification');
const fs = require('fs');
const path = require('path');

const Client = db.Client;
const queryParser = sequelizeQuery(db);

const BASE_URL = process.env.BASE_URL || "http://localhost:3002";

// 🔹 Récupérer tous les clients
exports.getAllClients = async (req, res) => {
  try {
    const query = await queryParser.parse(req);

    query.where = { ...query.where, entreprise_id: req.entrepriseId };

    const clients = await Client.findAll({ ...query });

    const data = clients.map(c => {
      const obj = c.toJSON();
      if (obj.image) obj.image = `${BASE_URL}${obj.image}`;
      return obj;
    });

    const count = await Client.count({ where: query.where });

    res.status(200).json({ count, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Récupérer un client par ID
exports.getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findOne({
      where: { id, entreprise_id: req.entrepriseId },
    });

    if (!client) return res.status(404).json({ message: "Client non trouvé" });

    const obj = client.toJSON();
    if (obj.image) obj.image = `${BASE_URL}${obj.image}`;

    res.status(200).json(obj);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Créer un client
exports.createClient = async (req, res) => {
  try {
    const entrepriseId = req.entrepriseId;
    let imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const client = await Client.create({
      ...req.body,
      entreprise_id: entrepriseId,
      image: imagePath,
    });

    await sendNotification({
      type: 'client',
      message: `New client created: ${client.name}`,
      user_id: req.user?.id,
    });

    res.status(201).json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Mettre à jour un client
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findOne({
      where: { id, entreprise_id: req.entrepriseId },
    });

    if (!client) return res.status(404).json({ message: "Client non trouvé" });

    if (req.file) {
      if (client.image) {
        const oldPath = path.join(process.cwd(), client.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      req.body.image = `/uploads/${req.file.filename}`;
    }

    await Client.update(req.body, { where: { id, entreprise_id: req.entrepriseId } });

    await sendNotification({
      type: 'client',
      message: `Client updated: ${client.name}`,
      user_id: req.user?.id,
    });

    res.status(200).json({ message: "Client mis à jour avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Supprimer un client
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Client.destroy({ where: { id, entreprise_id: req.entrepriseId } });

    if (!deleted) return res.status(404).json({ message: "Client non trouvé" });

    await sendNotification({
      type: 'client',
      message: `Client deleted (ID: ${id})`,
      user_id: req.user?.id,
    });

    res.status(200).json({ message: "Client supprimé avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
