const { users } = require('../dataStore');
const Purchase = require('../model/Purchase');

/**
 * Obtener la última compra realizada por el usuario.
 * 
 * @param {object} req - El objeto de la solicitud.
 * @param {object} res - El objeto de la respuesta.
 * @returns {object} - La última compra realizada.
 */
exports.getLastPurchase = async (req, res) => {
    try {
        // Fetch user information based on the provided token
        const whoamiResponse = await fetch('http://localhost:3000/whoami', {
            method: 'GET',
            headers: {
                'Authorization': req.headers.authorization
            }
        });

        // Handle unauthorized or invalid token
        if (whoamiResponse.status !== 200) {
            return res.status(401).send('Token inválido o usuario no autenticado');
        }

        // Extract user data from the response
        const userData = await whoamiResponse.json();
        const user = users.get(userData.token);

        // Check if there are any purchases
        if (user.purchases.length === 0) {
            return res.status(404).send('No hay compras realizadas');
        }

        // Get the last purchase
        const lastPurchase = user.purchases[user.purchases.length - 1];

        // Send the last purchase as the response
        res.status(200).json(lastPurchase);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
};

/**
 * Obtener todas las compras realizadas por el usuario.
 * 
 * @param {object} req - El objeto de la solicitud.
 * @param {object} res - El objeto de la respuesta.
 * @returns {object} - Todas las compras realizadas.
 */
exports.getPurchases = async (req, res) => {
    try {
        // Fetch user information based on the provided token
        const whoamiResponse = await fetch('http://localhost:3000/whoami', {
            method: 'GET',
            headers: {
                'Authorization': req.headers.authorization
            }
        });

        // Handle unauthorized or invalid token
        if (whoamiResponse.status !== 200) {
            return res.status(401).send('Token inválido o usuario no autenticado');
        }

        // Extract user data from the response
        const userData = await whoamiResponse.json();
        const user = users.get(userData.token);

        // Get all purchases
        const purchases = user.purchases;

        // Send all purchases as the response
        res.status(200).json(purchases);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
};
