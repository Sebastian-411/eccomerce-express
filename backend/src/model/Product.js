/**
 * Represents a product in the inventory.
 */
class Product {
    /**
     * Create a new Product instance.
     * @param {string} name - The name of the product.
     * @param {number} price - The price of the product.
     */
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

module.exports = Product;
