const express = require('express');
const route = express.Router();
const CartController = require('../controllers/cart');

route.post('/cart/add', CartController.addToCart);
route.post('/cart/remove', CartController.removeFromCart);
route.delete('/cart/:_id', CartController.deleteCart);
route.get('/cart', CartController.listCart);
route.get('/cart/:_id', CartController.getCartById);

module.exports = route;
