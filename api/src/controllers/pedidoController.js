const pedidoService = require('../services/pedidoService');

exports.getAllPedidos = async (req, res) => {
    try {
        const pedidos = await pedidoService.getAllPedidos();
        res.json({ status: 'success', data: pedidos });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getPedidoById = async (req, res) => {
    try {
        const pedido = await pedidoService.getPedidoById(req.params.id);
        res.json({ status: 'success', data: pedido });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.createPedido = async (req, res) => {
    try {
        const newPedido = await pedidoService.createPedido(req.body);
        res.status(201).json({ status: 'success', data: newPedido });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.updatePedido = async (req, res) => {
    try {
        const updatedPedido = await pedidoService.updatePedido(req.params.id, req.body);
        res.json({ status: 'success', data: updatedPedido });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.deletePedido = async (req, res) => {
    try {
        await pedidoService.deletePedido(req.params.id);
        res.json({ status: 'success', message: 'Pedido eliminado' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
