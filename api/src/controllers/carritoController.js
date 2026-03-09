const carritoService = require('../services/carritoService');

exports.getCarrito = async (req, res) => {
    try {
        // Obtenemos el ID del usuario desde el token (req.user fue inyectado por el authMiddleware)
        const idUsuario = req.user.id_usuario;
        let carrito = await carritoService.getCarrito(idUsuario);
        res.json(carrito);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addItem = async (req, res) => {
    try {
        const { nombre, precio } = req.body;
        const idUsuario = req.user.id_usuario;
        
        let carrito = await carritoService.addItem(idUsuario, req.params.id_pala, nombre, precio);
        res.json(carrito);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.removeItem = async (req, res) => {
    try {
        const idUsuario = req.user.id_usuario;
        const carrito = await carritoService.removeItem(idUsuario, req.params.id_pala);
        res.json(carrito);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.clearCarrito = async (req, res) => {
    try {
        const idUsuario = req.user.id_usuario;
        const carrito = await carritoService.clearCarrito(idUsuario);
        res.json(carrito);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};