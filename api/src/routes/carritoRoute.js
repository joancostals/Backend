const express = require('express');
const router = express.Router();
const carritoService = require('../services/carritoService');

// GET tots els carritos
router.get('/', async (req, res) => {
    try {
        const carritos = await carritoService.getAllCarritos();
        res.json({ status: 'success', data: carritos });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// GET carrito per ID
router.get('/:id', async (req, res) => {
    try {
        const carrito = await carritoService.getCarritoById(req.params.id);
        res.json({ status: 'success', data: carrito });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// POST crear carrito
router.post('/', async (req, res) => {
    try {
        const carrito = await carritoService.createCarrito(req.body);
        res.json({ status: 'success', data: carrito });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

// PUT actualitzar carrito per ID
router.put('/:id', async (req, res) => {
    try {
        const carrito = await carritoService.updateCarrito(req.params.id, req.body);
        res.json({ status: 'success', data: carrito });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

// DELETE carrito per ID
router.delete('/:id', async (req, res) => {
    try {
        await carritoService.deleteCarrito(req.params.id);
        res.json({ status: 'success', message: 'Carrito eliminat' });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

module.exports = router;
