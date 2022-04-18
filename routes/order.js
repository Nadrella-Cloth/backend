const express = require('express');
const route = express.Router();
const OrderController = require('../controllers/order');

route.post('/order', OrderController.create);
route.get('/orders', OrderController.listOrder);
route.get('/order/:_id', OrderController.getOrderById);
route.delete('/order/:_id/', OrderController.deleteOrder);

module.exports = route;
