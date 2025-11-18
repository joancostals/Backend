const carritoService = require('../services/carritoService');

exports.getAllCarritos = async (req, res) => {
    try {
        const carritos = await carritoService.getAllCarritos();
        res.json({ status: 'success', data: carritos });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getCarritoById = async (req, res) => {
    try {
        const carrito = await carritoService.getCarritoById(req.params.id);
        res.json({ status: 'success', data: carrito });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.createCarrito = async (req, res) => {
    try {
        const newCarrito = await carritoService.createCarrito(req.body);
        res.status(201).json({ status: 'success', data: newCarrito });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.updateCarrito = async (req, res) => {
    try {
        const updatedCarrito = await carritoService.updateCarrito(req.params.id, req.body);
        res.json({ status: 'success', data: updatedCarrito });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.deleteCarrito = async (req, res) => {
    try {
        await carritoService.deleteCarrito(req.params.id);
        res.json({ status: 'success', message: 'Carrito eliminado' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
