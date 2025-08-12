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
    delete: async (req, res) => {
        const id = req.params.id;
        try {
            const result = await deleteSupplier(id);
            res.status(200).send({ message: "Supplier deleted", result });
        } catch (error) {
            res.status(500).send(error);
        }
    },
    getProducts: async (req, res) => {
        const id = req.params.id;
        try {
            const products = await getProductBySuppliers(id);
            res.status(200).send(products);
        } catch (error) {
            res.status(500).send(error);
        }
    },
};
