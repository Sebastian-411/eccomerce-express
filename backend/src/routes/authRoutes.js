/**
 * Express router for handling authentication-related routes.
 * @module routes/authRoutes
 */
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * Route for user registration.
 * @name POST /register
 * @function
 * @memberof module:routes/authRoutes
 * @inner
 * @param {string} path - Express route path.
 * @param {callback} middleware - Express middleware.
 */
router.post('/register', authController.register);

/**
 * Route for user login.
 * @name POST /login
 * @function
 * @memberof module:routes/authRoutes
 * @inner
 * @param {string} path - Express route path.
 * @param {callback} middleware - Express middleware.
 */
router.post('/login', authController.login);

/**
 * Route for getting user information.
 * @name GET /whoami
 * @function
 * @memberof module:routes/authRoutes
 * @inner
 * @param {string} path - Express route path.
 * @param {callback} middleware - Express middleware.
 */
router.get('/whoami', authController.whoami);

module.exports = router;
