/**
 * Express router for handling client-related routes.
 * @module routes/clientRoutes
 */
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

/**
 * Route for making a purchase.
 * @name POST /purchase
 * @function
 * @memberof module:routes/clientRoutes
 * @inner
 * @param {string} path - Express route path.
 * @param {callback} middleware - Express middleware.
 */
router.post('/purchase', clientController.purchase);

/**
 * Route for retrieving purchase history.
 * @name GET /purchase/history
 * @function
 * @memberof module:routes/clientRoutes
 * @inner
 * @param {string} path - Express route path.
 * @param {callback} middleware - Express middleware.
 */
router.get('/purchase/history', clientController.purchaseHistory);

module.exports = router;
