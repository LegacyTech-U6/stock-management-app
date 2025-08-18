const express = require('express');
const router = express.Router();
const ordersController = require('../controller/ordersController');

router.get('/', ordersController.getAllOrders);
router.get('/:id', ordersController.getOrderById);
router.post('/', ordersController.createOrder);
router.patch('/:id/status', ordersController.updateOrderStatus);

module.exports = router;
