/**
 * Retrieves the user's shopping cart.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - The response containing the user's cart products.
 */
exports.getCart = async (req, res) => {
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

        // Check if the user is an admin
        if (user.isAdmin()) {
            return res.status(403).send('El usuario debe ser cliente');
        }

        // Send the user's cart products as a response
        res.status(201).send(user.cart.getProducts());
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
};

/**
 * Updates the user's shopping cart with the specified product and quantity.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - The response indicating successful product update in the cart.
 */
exports.updateCart = async (req, res) => {
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

        // Check if the user is an admin
        if (user.isAdmin()) {
            return res.status(403).send('El usuario debe ser cliente');
        }

        // Extract product ID and quantity from the request body
        const { productId, quantity } = req.body;

        // Validate product ID and quantity
        if (!productId || quantity < 0) {
            return res.status(400).send('Se debe proporcionar el ID del producto y una cantidad válida');
        }

        // Retrieve the product from the data store
        const product = products.get(productId);

        // Check if the product exists
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }

        // Update the user's cart with the specified product and quantity
        user.cart.updateProduct(productId, quantity);

        // Send a success response
        res.status(201).send('Producto actualizado en el carrito exitosamente');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
};
