const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const Supplier = require('../models/supplierModel');
const { sendWhatsApp, sendEmail } = require('../utils/notification');

/**
 * Récupérer toutes les commandes
 */
getAllOrders:async  (req, res)=> {
    try {
        const orders = await Order.getAllOrders();
        res.json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
}

/**
 * Récupérer une commande par ID
 */
async function getOrderById(req, res) {
    const { id } = req.params;
    try {
        const order = await Order.getOrderById(id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Commande non trouvée' });
        }
        res.json({ success: true, order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
}

/**
 * Créer une commande manuelle (optionnel, ou utilisée par l'automatisation)
 */
async function createOrder(req, res) {
    const { product_id, supplier_id, quantity } = req.body;
    try {
        const orderId = await Order.createOrder(product_id, supplier_id, quantity);

        // Récupérer les infos produit et fournisseur
        const product = await Product.findById(product_id);
        const supplier = await Supplier.getOnesupplier(supplier_id);

        // Préparer le message
        const message = `Commande: ${quantity} x ${product.Prod_name}`;

        // Envoyer selon le canal préféré
        if (supplier.preferred_channel === 'whatsapp' && supplier.whatsapp_number) {
            await sendWhatsApp(supplier.whatsapp_number, message);
        } else {
            await sendEmail(supplier.email, 'Commande Stockly', message);
        }

        // Mettre à jour le statut
        await Order.updateOrderStatus(orderId, 'sent');

        res.json({ success: true, message: 'Commande créée et envoyée', orderId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
}

/**
 * Mettre à jour le statut d'une commande
 */
async function updateOrderStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updated = await Order.updateOrderStatus(id, status);
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Commande non trouvée' });
        }
        res.json({ success: true, message: 'Statut mis à jour' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
}

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderStatus
};
