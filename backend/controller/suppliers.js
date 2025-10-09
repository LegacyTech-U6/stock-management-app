const {
  getAllSuppliers,
  getOneSupplier,
  updateSuppliers,
  deleteSupplier,
  getProductBySuppliers,
  createSupplier,
} = require("../models/Suppliers");

module.exports = {
  // --- Récupérer tous les fournisseurs ---
  get: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const suppliers = await getAllSuppliers(entrepriseId);
      res.json(suppliers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  // --- Récupérer un fournisseur ---
  getOne: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const id = parseInt(req.params.id);
      const supplier = await getOneSupplier(id, entrepriseId);
      if (!supplier) return res.status(404).json({ message: "Supplier not found" });
      res.json(supplier);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  // --- Créer un fournisseur ---
  addSupplier: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const { supplier_name, supplier_address, phone_number, email, whatsapp_number, preferred_channel } = req.body;

      if (!supplier_name || !supplier_address || !phone_number) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newSupplierId = await createSupplier(
        supplier_name,
        supplier_address,
        phone_number,
        email || null,
        whatsapp_number || null,
        preferred_channel || 'email',
        entrepriseId
      );

      res.status(201).json({ message: "Supplier created", id: newSupplierId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  // --- Modifier un fournisseur ---
  modifySupplier: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const id = parseInt(req.params.id);
      const { supplier_name, supplier_address, phone_number, email, whatsapp_number, preferred_channel } = req.body;

      const updatedSupplier = await updateSuppliers(
        id,
        supplier_name,
        supplier_address,
        phone_number,
        email || null,
        whatsapp_number || null,
        preferred_channel || 'email',
        entrepriseId
      );

      if (!updatedSupplier) return res.status(404).json({ message: "Supplier not found" });

      res.json({ message: "Supplier updated", updatedSupplier });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  // --- Supprimer un fournisseur ---
  delete: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const id = parseInt(req.params.id);

      const result = await deleteSupplier(id, entrepriseId);
      if (!result) return res.status(404).json({ message: "Supplier not found" });

      res.json({ message: "Supplier deleted", result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  // --- Récupérer les produits d’un fournisseur ---
  getProducts: async (req, res) => {
    try {
      const entrepriseId = req.entrepriseId;
      const id = parseInt(req.params.id);

      const products = await getProductBySuppliers(id, entrepriseId);
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
};
