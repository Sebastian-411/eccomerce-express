/**
 * Express router for handling product-related routes.
 * @module routes/productRoutes
 */
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * Route for adding a new product.
 * @name POST /products
 * @function
 * @memberof module:routes/productRoutes
 * @inner
 * @param {string} path - Express route path.
 * @param {callback} middleware - Express middleware.
 */
router.post('/products', productController.upload.single('image'), productController.addProduct);

/**
 * Route for retrieving all products.
 * @name GET /products
 * @function
 * @memberof module:routes/productRoutes
 * @inner
 * @param {string} path - Express route path.
 * @param {callback} middleware - Express middleware.
 */
router.get('/products', productController.getProducts);

/**
 * Route for updating a product.
 * @name PUT /products
 * @function
 * @memberof module:routes/productRoutes
 * @inner
 * @param {string} path - Express route path.
 * @param {callback} middleware - Express middleware.
 */
router.put('/products', productController.upload.single('image'), productController.updateProduct);

/**
 * Route for deleting a product.
 * @name DELETE /products
 * @function
 * @memberof module:routes/productRoutes
 * @inner
 * @param {string} path - Express route path.
 * @param {callback} middleware - Express middleware.
 */
router.delete('/products', productController.deleteProduct);



router.get('/product/:id', productController.getProductById);

module.exports = router;
