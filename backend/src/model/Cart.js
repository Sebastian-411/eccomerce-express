/**
 * Represents a user's shopping cart.
 */
class Cart {
    /**
     * Create a new Cart instance.
     */
    constructor() {
        this.products = new Map();
    }

    /**
     * Remove a product from the cart.
     * @param {number} productId - The ID of the product to be removed.
     */
    removeProduct(productId) {
        this.products.delete(productId);
    }

    /**
     * Update the quantity of a product in the cart.
     * If the quantity becomes zero or negative, the product is removed from the cart.
     * @param {number} productId - The ID of the product to be updated.
     * @param {number} quantity - The new quantity of the product.
     */
    updateProduct(productId, quantity) {
        if (quantity <= 0) {
            this.removeProduct(productId);
            return;
        }
    
        this.products.set(productId, quantity);
    }

    /**
     * Get information about all products in the cart.
     * @returns {Array} - An array containing information about the products in the cart.
     */
    getProducts() {
        const productsInfo = [];

        this.products.forEach((quantity, productId) => {
            const product = products.get(productId);

            if (product) {
                const productInfo = {
                    id: productId,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    quantity: quantity
                };

                productsInfo.push(productInfo);
            }
        });

        return productsInfo;
    }
}

module.exports = Cart;
