const pedidoService = require('../services/pedidoService');
const carritoService = require('../services/carritoService');
const { v4: uuidv4 } = require('uuid');

exports.checkout = async (req, res) => {
    try {
        const idUsuario = req.user.id_usuario;
        
        const carrito = await carritoService.getCarrito(idUsuario);
        if (!carrito || carrito.items.length === 0) {
            return res.status(400).json({ status: 'error', message: 'El carrito está vacío' });
        }
        
        const { detallesEnvio } = req.body;
        
        if (!detallesEnvio || !detallesEnvio.nombre || !detallesEnvio.direccion) {
            return res.status(400).json({ status: 'error', message: 'Faltan detalles de envío' });
        }

        const total = carrito.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        
        const nuevoPedidoData = {
            id_pedido: uuidv4(),
            id_usuario: idUsuario,
            items: carrito.items.map(item => ({
                id_pala: item.id_pala,
                nombre: item.nombre,
                precio_unitario: item.precio,
                cantidad: item.cantidad
            })),
            detallesEnvio: detallesEnvio,
            total: total,
            estado: 'pending' 
        };
        
        const nuevoPedido = await pedidoService.createPedido(nuevoPedidoData);
        await carritoService.clearCarrito(idUsuario);
        
        res.status(201).json({ status: 'success', data: nuevoPedido });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getAllPedidos = async (req, res) => {
    try {
        const pedidos = await pedidoService.getAllPedidos();
        res.json({ status: 'success', data: pedidos });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getPedidosUsuario = async (req, res) => {
    try {
        const pedidos = await pedidoService.getPedidosUsuario(req.params.id);
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
