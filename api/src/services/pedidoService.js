const Pedido = require('../models/Pedido');

// Crear un nou pedido
const createPedido = async (pedidoData) => {
  const newPedido = new Pedido(pedidoData);
  return await newPedido.save();
};

// Obtenir tots els pedidos
const getPedidos = async () => {
  return await Pedido.find()
    .populate('id_usuario')
    .populate('id_pala');
};

// Obtenir un pedido per ID
const getPedidoById = async (id) => {
  return await Pedido.findById(id)
    .populate('id_usuario')
    .populate('id_pala');
};

// Actualitzar un pedido per ID
const updatePedido = async (id, updateData) => {
  return await Pedido.findByIdAndUpdate(id, updateData, { new: true });
};

// Eliminar un pedido per ID
const deletePedido = async (id) => {
  return await Pedido.findByIdAndDelete(id);
};

module.exports = {
  createPedido,
  getPedidos,
  getPedidoById,
  updatePedido,
  deletePedido
};
