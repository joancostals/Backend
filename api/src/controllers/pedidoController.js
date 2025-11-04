const Pedido = require('../models/pedidoModel');

// Crear pedido
exports.createPedido = async (req, res) => {
  try {
    const pedido = await Pedido.create(req.body);
    res.status(201).json({ status: 'success', data: pedido });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Obtener todos los pedidos
exports.getPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate('id_usuario');
    res.status(200).json({ status: 'success', data: pedidos });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Obtener pedido por ID
exports.getPedidoById = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id).populate('id_usuario');
    if (!pedido) {
      return res.status(404).json({ status: 'error', message: 'Pedido no encontrado' });
    }
    res.status(200).json({ status: 'success', data: pedido });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Actualizar pedido
exports.updatePedido = async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pedido) {
      return res.status(404).json({ status: 'error', message: 'Pedido no encontrado' });
    }
    res.status(200).json({ status: 'success', data: pedido });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Eliminar pedido
exports.deletePedido = async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndDelete(req.params.id);
    if (!pedido) {
      return res.status(404).json({ status: 'error', message: 'Pedido no encontrado' });
    }
    res.status(200).json({ status: 'success', message: 'Pedido eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
