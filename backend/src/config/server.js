/**
 * Configures and runs an Express server to handle application routes.
 * 
 * @module server
 */

const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());

// Imports routes for product management, authentication, and cart
const productRoutes = require('../routes/productRoutes');
const authRoutes = require('../routes/authRoutes');
const cartRoutes = require('../routes/cartRoutes');
const purchaseRoutes = require('../routes/purchaseRoutes');

app.use('/uploads', express.static('../uploads'));


// Middleware to parse request bodies as JSON
app.use(express.json());


// Routes for product management
app.use('', productRoutes);

// Routes for authentication
app.use('', authRoutes);

// Routes for the shopping cart
app.use('', cartRoutes);

// Routes for the shopping cart
app.use('', purchaseRoutes);

// Configures the server port
const PORT = process.env.PORT || 3000;

const registerUser = async () => {
    const url = 'http://localhost:3000/register';
    const data = {
        username: 'admin',
        password: 'admin',
        rol: 'admin'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        const result = await response.json();
        console.log('Registro exitoso:', result);
    } catch (error) {
        console.error('Error:', error);
    }
};

// Starts the server and listens for requests on the specified port
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await registerUser(); 
});
