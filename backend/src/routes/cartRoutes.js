/**
 * Express router for handling cart-related routes.
 * @module routes/cartRoutes
 */
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

/**
 * Route for getting the user's cart.
 * @name GET /cart
 * @function
 * @memberof module:routes/cartRoutes
 * @inner
 * @param {string} path - Express route path.
 * @param {callback} middleware - Express middleware.
 */
router.get('/cart', cartController.getCart);

/**
 * Route for updating the user's cart.
 * @name POST /cart
 * @function
 * @memberof module:routes/cartRoutes
 * @inner
 * @param {string} path - Express route path.
 * @param {callback} middleware - Express middleware.
 */
router.post('/cart', cartController.updateCart);


router.post('/cart/purchase', cartController.buyCart);


module.exports = router;
