const { users, products, purchases } = require('../dataStore');
const Purchase = require('../model/Purchase');

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
        const prod = user.cart.getProductById(productId)
        // Retrieve the product from the data store
        const product = products.get(productId);
        // Check if the product exists
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }


        // Validate product ID and quantity
        if(prod==null){
            if (!productId || quantity < 0) {
                return res.status(400).send('Se debe proporcionar el ID del producto y una cantidad válida');
            }    
        }



        
        // Update the user's cart with the specified product and quantity
        if(prod!=null){
            const currentQuantityInCart = Number(prod.quantity);
            const addedQuantity = Number(quantity);
            user.cart.updateProduct(productId, currentQuantityInCart+addedQuantity);
        }else{
            user.cart.updateProduct(productId, quantity);
        }
        // Send a success response
        res.status(201).send('Producto actualizado en el carrito exitosamente');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
};



/**
 * Purchase all products in the user's shopping cart.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - The response indicating successful purchase.
 */
exports.buyCart = async (req, res) => {
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

        // Get the products from the user's cart
        const cartProducts = user.cart.getProducts();

        // Check if the cart is empty
        if (cartProducts.length === 0) {
            return res.status(400).send('El carrito está vacío');
        }

        // Calculate the total price of the purchase
        const totalPrice = cartProducts.reduce((total, product) => {
            return total + (product.price * product.quantity);
        }, 0);

        // Create a new purchase instance
        const purchaseId = purchases.size; // ID es la longitud de las compras
        const purchaseDate = new Date();
        const purchaseProducts = cartProducts.map(product => ({
            id: product.id,
            name: product.name,
            quantity: product.quantity,
            price: product.price
        }));
        const purchase = new Purchase(purchaseId, purchaseDate, totalPrice, purchaseProducts);

        // Variable para controlar si se encuentra un problema con el inventario
        let inventoryError = false;

        // Reducir la cantidad comprada de cada producto en el inventario
        cartProducts.forEach(product => {
            const inventoryProduct = products.get(product.id);
            const remainingQuantity = inventoryProduct.quantity - product.quantity;
            if (remainingQuantity < 0) {
                // Si la cantidad restante es menor que 0, enviar un error
                inventoryError = true;
                return res.status(400).send(`La cantidad comprada de ${product.name} excede la cantidad disponible en el inventario`);
            }
            inventoryProduct.quantity = remainingQuantity;
        });

        // Si se encontró un problema con el inventario, no continuar con la compra
        if (inventoryError) {
            return;
        }

        // Agregar la compra al arreglo de compras del usuario
        user.addPurchase(purchaseId, purchase);
        purchases.set(purchaseId, purchase);

        // Vaciar el carrito del usuario
        user.cart.clear();

        // Enviar una respuesta exitosa
        res.status(200).send(purchase);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
};
