/**
 * Configures and runs an Express server to handle application routes.
 * 
 * @module server
 */

const express = require('express');
const app = express();

// Imports routes for product management, authentication, and cart
const adminRoutes = require('../routes/productRoutes');
const productRoutes = require('../routes/productRoutes');
const authRoutes = require('../routes/authRoutes');
const cartRoutes = require('../routes/cartRoutes');

// Middleware to parse request bodies as JSON
app.use(express.json());

// Routes for product administration
app.use('/admin', adminRoutes);

// Routes for product management
app.use('', productRoutes);

// Routes for authentication
app.use('', authRoutes);

// Routes for the shopping cart
app.use('', cartRoutes);

// Configures the server port
const PORT = process.env.PORT || 3000;

// Starts the server and listens for requests on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
