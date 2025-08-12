const {
  getAllsupplier,
  getOnesupplier,
  updateSuppliers,
  deleteSupplier,
  getProductBySuppliers,
} = require("../models/Suppliers");

module.exports = {
  get: async (req, res) => {
    const Suppliers = await getAllsupplier();
    res.send(Suppliers);
  },
  getOne: async (req, res) => {
    const id = req.params.id;
    const OneSupplier = await getOnesupplier(id);
    res.send(OneSupplier);
  },
  modifySupplier: async (req, res) => {
    const id = req.params.id;
    const { supplier_name, suppier_address, phone_number } = req.body;
    try {
      const updatedSupplier = await updateSuppliers(
        id,
        supplier_name,
        suppier_address,
        phone_number
      );
      res.status(201).send(updatedSupplier);
    } catch (error) {
        res.send(error);
    }
  },
};
