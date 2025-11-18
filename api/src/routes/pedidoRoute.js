const express = require('express');
const router = express.Router();
const pedidoService = require('../services/pedidoService');

// GET tots els pedidos
router.get('/', async (req, res) => {
    try {
        const pedidos = await pedidoService.getAllPedidos();
        res.json({ status: 'success', data: pedidos });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// GET pedido per ID
router.get('/:id', async (req, res) => {
    try {
        const pedido = await pedidoService.getPedidoById(req.params.id);
        res.json({ status: 'success', data: pedido });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// POST crear pedido
router.post('/', async (req, res) => {
    try {
        const pedido = await pedidoService.createPedido(req.body);
        res.json({ status: 'success', data: pedido });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

// PUT actualitzar pedido per ID
router.put('/:id', async (req, res) => {
    try {
        const pedido = await pedidoService.updatePedido(req.params.id, req.body);
        res.json({ status: 'success', data: pedido });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

// DELETE pedido per ID
router.delete('/:id', async (req, res) => {
    try {
        await pedidoService.deletePedido(req.params.id);
        res.json({ status: 'success', message: 'Pedido eliminat' });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

module.exports = router;
