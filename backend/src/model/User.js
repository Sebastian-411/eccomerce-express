/**
 * Represents a user of the system.
 */
const Cart = require('./Cart');
const Purchase = require('./Purchase');
const crypto = require('crypto');

class User {
    /**
     * Create a new User instance.
     * @param {string} user - The username of the user.
     * @param {string} password - The password of the user.
     * @param {string} [rol=client] - The role of the user, defaults to 'client'.
     */
    constructor(user, password, rol = 'client') {
        this.user = user;
        this.password = this.hashPassword(password);
        this.rol = rol;
        this.cart = new Cart();
        this.token = this.generateToken();
        this.purchases = [];
    }

    addPurchase(purchase) {
        this.purchases.push(purchase);
    }

    
    /**
     * Hashes the provided password using SHA-256 algorithm.
     * @param {string} password - The password to hash.
     * @returns {string} - The hashed password.
     */
    hashPassword(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }

    /**
     * Generates a unique token based on the user's username and hashed password.
     * @returns {string} - The generated token.
     */
    generateToken() {
        return crypto.createHash('sha256').update(this.user + this.password).digest('hex');
    }

    /**
     * Checks if the user has admin role.
     * @returns {boolean} - True if the user is an admin, false otherwise.
     */
    isAdmin() {
        return this.rol === 'admin';
    }

    /**
     * Checks if the user has client role.
     * @returns {boolean} - True if the user is a client, false otherwise.
     */
    isClient() {
        return this.rol === 'client';
    }

    /**
     * Logs in the user by checking the provided username and password.
     * @param {string} username - The username to check.
     * @param {string} password - The password to check.
     * @returns {boolean} - True if the login is successful, false otherwise.
     */
    logIn(username, password) {
        if (this.user === username && this.password === this.hashPassword(password)) {
            return true;
        }
        return false;
    }
}

module.exports = User;
