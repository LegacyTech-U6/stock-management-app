// controllers/invoice.controller.js
const sequelizeQuery = require("sequelize-query");
const db = require("../config/db");
const { Invoice, InvoiceItem, Product, Client, Entreprise, Sale } = db;

const queryParser = sequelizeQuery(db);

const InvoiceController = {
  // 🔹 Créer une facture
  async createInvoice(req, res) {
    try {
      const entreprise_id = req.entrepriseId;
      const {
        client_id,
        items = [],
        discount = 0,
        reduction_type,
        notes,
        mode_paiement,
        date_echeance,
        tax = 0,
      } = req.body;

      let total_hors_reduction = 0;
      for (const item of items) {
        total_hors_reduction +=
          Number(item.quantity) * Number(item.selling_price);
      }
      const general_total =
        total_hors_reduction - Number(discount) + Number(tax);

      const invoice = await Invoice.create({
        client_id,
        entreprise_id,
        total_hors_reduction,
        discount,
        reduction_type,
        tva,
        general_total,
        notes,
        status: "en_attente",
        mode_paiement,
        date_echeance,
      });

      for (const item of items) {
        await InvoiceItem.create({
          invoice_id: invoice.id,
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.selling_price,
          tva: item.vat || 0,
          discount: item.discount || 0,
        });

        // Mettre à jour le stock et créer la vente
        const product = await Product.findOne({
          where: { id: item.id, entreprise_id },
        });
        if (!product) throw new Error(`Produit introuvable: ${item.id}`);

        product.quantity -= item.quantity;
        await product.save();

        await Sale.create({
          product_id: item.id,
          quantity_sold: item.quantity,
          total_price: item.selling_price * item.quantity,
          total_profit:
            (item.selling_price - product.cost_price) * item.quantity,
          entreprise_id,
        });
      }

      res.status(201).json(invoice);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },

  // 🔹 Récupérer toutes les factures
  async getAllInvoices(req, res) {
    try {
      const entreprise_id = req.entrepriseId;
      const query = await queryParser.parse(req);

      query.where = { ...query.where, entreprise_id };

      const data = await Invoice.findAll({
        ...query,
        include: [
          { model: Client, attributes: ["id", "client_name", "email"] },
          {
            model: InvoiceItem,
            include: [{ model: Product, attributes: ["id", "Prod_name"] }],
          },
        ],
        order: [["id", "DESC"]],
      });

      const count = await Invoice.count({ where: query.where });

      res.status(200).json({ count, data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },

  // 🔹 Récupérer une facture par ID
  async getInvoiceById(req, res) {
    try {
      const entreprise_id = req.entrepriseId;
      const { id } = req.params;

      const invoice = await Invoice.findOne({
        where: { id, entreprise_id },
        include: [
          { model: Client, attributes: ["id", "client_name", "email"] },
          {
            model: InvoiceItem,
            include: [{ model: Product, attributes: ["id", "Prod_name"] }],
          },
        ],
      });

      if (!invoice)
        return res.status(404).json({ message: "Facture non trouvée" });

      res.status(200).json(invoice);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = InvoiceController;
