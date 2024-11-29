// routes/orderRoutes.js
const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

// Create a new order with products
router.post('/', orderController.createOrder);

// Get all orders with users and products
router.get('/', orderController.getAllOrders);

// Get a single order by ID with user and products
router.get('/:id', orderController.getOrderById);

// Update an order by ID with products
router.put('/:id', orderController.updateOrder);

// Delete an order by ID
router.delete('/:id', orderController.deleteOrder);

module.exports = router;