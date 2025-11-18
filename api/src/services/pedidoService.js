const Pedido = require('../models/pedidoModel');

exports.getAllPedidos = async () => await Pedido.find();
exports.getPedidoById = async (id) => await Pedido.findById(id);
exports.createPedido = async (data) => {
    const pedido = new Pedido(data);
    return await pedido.save();
};
exports.updatePedido = async (id, data) => await Pedido.findByIdAndUpdate(id, data, { new: true });
exports.deletePedido = async (id) => await Pedido.findByIdAndDelete(id);
