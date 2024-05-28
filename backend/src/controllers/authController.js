/**
 * Manages user registration, login, and authentication operations.
 * 
 * @module authController
 */

const User = require('../model/User');
const { users } = require('../dataStore');

/**
 * Registers a new user with the provided username, password, and role.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - The response containing the generated token upon successful registration.
 */
exports.register = (req, res) => {
    const { username, password, rol } = req.body;
    
    // Check if the username is already in use
    const existingUser = Array.from(users.values()).find(user => user.user === username);

    if (existingUser) {
        return res.status(400).send({ 'error': 'El nombre de usuario ya está en uso' });
    } else if (rol !== 'admin' && rol !== 'client' && rol !== undefined) {
        // Check if the role is valid
        return res.status(400).send({ 'error': 'Rol no válido' });
    } else {
        // Create a new user and add it to the data store
        const newUser = new User(username, password, rol);
        users.set(newUser.token, newUser);
        return res.status(201).send({ success:true, message: 'Registro exitoso', token: newUser.token });
    }
};

/**
 * Logs in a user with the provided username and password.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - The response containing the user's token upon successful login.
 */
exports.login = (req, res) => {
    const { username, password } = req.body;
    
    // Find the user with the provided credentials
    const user = Array.from(users.values()).find(user => user.logIn(username, password));

    if (user) {
        // Return the user's token if login is successful
        return res.status(200).send({ token: user.token });
    } else {
        // Return an error message if login fails
        return res.status(401).send('Credenciales inválidas');
    }
};

/**
 * Retrieves user information based on the provided token.
 * 
 * @param {object} req - The request object containing the token in the authorization header.
 * @param {object} res - The response object.
 * @returns {object} - The response containing the user's information if the token is valid.
 */
exports.whoami = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = users.get(token);

    if (user) {
        // Return user information if the token is valid
        return res.status(200).send(user);
    } else {
        // Return an error message if the token is invalid
        return res.status(401).send('Token inválido');
    }
};
