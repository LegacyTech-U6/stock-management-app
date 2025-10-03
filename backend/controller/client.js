const {
  getAllClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
} = require("../models/client");

module.exports = {
  getAll: async (req, res) => {
    const clientsData = await getAllClients();
    res.json(clientsData);
  },
  get: async (req, res) => {
    const id = req.params.id;
    const clientData = await getClient(id);
    if (clientData.length === 0) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json(clientData[0]);
  },
  create: async (req, res) => {
    const {
      client_name,
      client_Signature,
      client_PhoneNumber,
      email,
      location,
    } = req.body;
    if (
      !client_name ||
      !client_PhoneNumber ||
      !email ||
      !location
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newClientId = await createClient(
      client_name,
      client_Signature,
      client_PhoneNumber,
      email,
      location
    );
    res.status(201).json({ id: newClientId });
  },
  update: async (req, res) => {
    const id = req.params.id;
    const {
      client_name,
      client_Signature,
      client_PhoneNumber,
      email,
      location,
    } = req.body;
    if (
      !client_name ||
      !client_Signature ||
      !client_PhoneNumber ||
      email ||
      location
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    await updateClient(
      id,
      client_name,
      client_Signature,
      client_PhoneNumber,
      email,
      location
    );
    res.json({ message: "Client updated successfully" });
  },
  deleteclient: async (req, res) => {
    const id = req.params.id;
    await deleteClient(id);
    res.json({ message: "Client deleted successfully" });
  },
};
