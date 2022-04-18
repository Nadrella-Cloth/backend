const express = require('express');
const route = express.Router();
const ProductController = require('../controllers/product');

route.post('/product', ProductController.createProduct);
route.put('/product', ProductController.updateProduct);
route.get('/products', ProductController.listProduct);
route.get('/product/:id', ProductController.getProductById);
route.delete('/product/:_id', ProductController.deleteProduct);

route.post('/product/category', ProductController.createCategory);
route.get('/product/categories', ProductController.listCategory);
route.put('/product/category', ProductController.updateCategory);
route.delete('/product/category/:_id', ProductController.deleteCategory);

module.exports = route;
