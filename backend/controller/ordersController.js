// controllers/ordersController.js

const {
  createOrder: createOrderModel,
  getAllOrders: getAllOrdersModel,
  getOrderById: getOrderByIdModel,
  updateOrderStatus: updateOrderStatusModel
} = require("../models/Orders");

const { getOneProduct } = require("../models/dbConfig"); // ou productModel si tu as
const { getOnesupplier } = require("../models/Suppliers");
const { sendWhatsApp, sendEmail } = require("../utils/notification");

module.exports = {
  /**
   * Récupérer toutes les commandes
   * @route GET /orders
   * @group Orders - Gestion des commandes
   * @returns {Object} 200 - Liste des commandes
   * @returns {Error} 500 - Erreur serveur
   */
  getAllOrders: async (req, res) => {
    try {
      const orders = await getAllOrdersModel();
      return res.json({ success: true, orders });
    } catch (error) {
      console.error('[ordersController.getAllOrders] ', error);
      return res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  },

  /**
   * Récupérer une commande par ID
   * @route GET /orders/{id}
   * @group Orders - Gestion des commandes
   * @param {number} id.path.required - ID de la commande
   * @returns {Object} 200 - Détails de la commande
   * @returns {Error} 404 - Commande non trouvée
   * @returns {Error} 500 - Erreur serveur
   */
  getOrderById: async (req, res) => {
    const { id } = req.params;
    try {
      const order = await getOrderByIdModel(id);
      if (!order) {
        return res.status(404).json({ success: false, message: "Commande non trouvée" });
      }
      return res.json({ success: true, order });
    } catch (error) {
      console.error('[ordersController.getOrderById] ', error);
      return res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  },

  /**
   * Créer une commande (manuelle ou automatisée)
   * @route POST /orders
   * @group Orders - Gestion des commandes
   * @param {number} product_id.body.required - ID du produit à commander
   * @param {number} supplier_id.body.required - ID du fournisseur
   * @param {number} quantity.body.required - Quantité commandée (entier > 0)
   * @returns {Object} 201 - Confirmation de la création + envoi notification
   * @returns {Error} 400 - Paramètres invalides
   * @returns {Error} 404 - Produit ou fournisseur introuvable
   * @returns {Error} 500 - Erreur serveur
   */
  createOrder: async (req, res) => {
    const { product_id, supplier_id, quantity } = req.body;

    try {
      // 1) Validation basique
      if (!product_id || !supplier_id || !Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Body invalide: product_id, supplier_id, quantity (entier > 0) sont requis"
        });
      }

      // 2) Vérifier existences
      const product = await getOneProduct(product_id);
      if (!product) {
        return res.status(404).json({ success: false, message: "Produit introuvable" });
      }

      const supplier = await getOnesupplier(supplier_id);
      if (!supplier) {
        return res.status(404).json({ success: false, message: "Fournisseur introuvable" });
      }

      // 3) Créer la commande en base
      const orderId = await createOrderModel(product_id, supplier_id, quantity);

      // 4) Préparer le message
      const message = `Commande: ${quantity} x ${product.Prod_name}`;

      // 5) Tenter l'envoi (WhatsApp prioritaire si préféré et dispo)
      let statusToSet = 'pending';
      try {
        if (supplier.preferred_channel === "whatsapp" && supplier.whatsapp_number) {
          await sendWhatsApp(supplier.whatsapp_number, message);
        } else if (supplier.email) {
          await sendEmail(supplier.email, "Commande Stockly", message);
        } else {
          throw new Error("Aucun moyen de contact disponible pour ce fournisseur");
        }
        statusToSet = 'sent';
      } catch (notifyErr) {
        console.error('[ordersController.createOrder][notification] ', notifyErr);
        // On garde 'pending' pour signaler qu'il faudra réessayer l'envoi plus tard
      }

      // 6) Mettre à jour le statut selon l'envoi
      await updateOrderStatusModel(orderId, statusToSet);

      // 7) Réponse
      return res.status(201).json({
        success: true,
        message: statusToSet === 'sent'
          ? "Commande créée et notification envoyée"
          : "Commande créée mais notification non envoyée (à réessayer)",
        orderId
      });
      console.log(`Commande créée: ${orderId}, statut: ${statusToSet}`);

    } catch (error) {
      console.error('[ordersController.createOrder] ', error);
      return res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  },

  /**
   * Mettre à jour le statut d'une commande
   * @route PUT /orders/{id}/status
   * @group Orders - Gestion des commandes
   * @param {number} id.path.required - ID de la commande
   * @param {string} status.body.required - Nouveau statut (pending|sent|delivered)
   * @returns {Object} 200 - Confirmation de la mise à jour
   * @returns {Error} 400 - Statut invalide
   * @returns {Error} 404 - Commande non trouvée
   * @returns {Error} 500 - Erreur serveur
   */
  updateOrderStatus: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
      // Validation du statut
      const allowed = new Set(['pending', 'sent', 'delivered']);
      if (!allowed.has(status)) {
        return res.status(400).json({ success: false, message: "Statut invalide (pending|sent|delivered)" });
      }

      const updated = await updateOrderStatusModel(id, status);
      if (!updated) {
        return res.status(404).json({ success: false, message: "Commande non trouvée" });
      }

      return res.json({ success: true, message: "Statut mis à jour" });

    } catch (error) {
      console.error('[ordersController.updateOrderStatus] ', error);
      return res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  },
};
