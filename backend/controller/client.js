const {
  getAllClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
} = require("../models/client");

module.exports = {
  // ✅ Récupérer tous les clients de l'entreprise active
  getAll: async (req, res) => {
    try {
      if (!req.entrepriseId) {
        return res.status(400).json({ message: "Entreprise active manquante" });
      }
      const clientsData = await getAllClients(req.entrepriseId);
      res.json(clientsData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur lors de la récupération des clients" });
    }
  },

  // ✅ Récupérer un client par ID (et vérifier qu'il appartient à l'entreprise)
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const clientData = await getClient(id, req.entrepriseId);
      if (!clientData) {
        return res.status(404).json({ message: "Client non trouvé" });
      }
      res.json(clientData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur lors de la récupération du client" });
    }
  },

  // ✅ Créer un client lié à l'entreprise active
  create: async (req, res) => {
    try {
      if (!req.entrepriseId) {
        return res.status(400).json({ message: "Entreprise active manquante" });
      }

      const {
        client_name,
        client_Signature,
        client_PhoneNumber,
        email,
        location,
      } = req.body;

      if (!client_name || !client_PhoneNumber || !email || !location) {
        return res.status(400).json({ message: "Champs requis manquants" });
      }

      const newClientId = await createClient(
        client_name,
        client_Signature,
        client_PhoneNumber,
        email,
        location,
        req.entrepriseId // 👈 L'entreprise active
      );

      res.status(201).json({ id: newClientId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur lors de la création du client" });
    }
  },

  // ✅ Mettre à jour un client
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const {
        client_name,
        client_Signature,
        client_PhoneNumber,
        email,
        location,
      } = req.body;

      if (!client_name || !client_PhoneNumber || !email || !location) {
        return res.status(400).json({ message: "Champs requis manquants" });
      }

      await updateClient(
        id,
        client_name,
        client_Signature,
        client_PhoneNumber,
        email,
        location,
        req.entrepriseId // 👈 vérification de l'entreprise
      );

      res.json({ message: "Client mis à jour avec succès" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur lors de la mise à jour du client" });
    }
  },

  // ✅ Supprimer un client
  deleteclient: async (req, res) => {
    try {
      const id = req.params.id;
      await deleteClient(id, req.entrepriseId); // 👈 supprimer uniquement dans l'entreprise active
      res.json({ message: "Client supprimé avec succès" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur lors de la suppression du client" });
    }
  },
};
