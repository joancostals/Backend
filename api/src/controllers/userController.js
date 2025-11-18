const userService = require('../services/userService');

// Registro
exports.register = async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json({ status: 'success', data: user });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { user, token } = await userService.loginUser(req.body);
        res.json({ status: 'success', data: user, token });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
};

// Otros métodos
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json({ status: 'success', data: users });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json({ status: 'success', data: user });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.json({ status: 'success', data: user });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);
        res.json({ status: 'success', message: 'Usuari eliminat' });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
};
