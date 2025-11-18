const Carrito = require('../models/Carrito');

exports.getAllCarritos = async () => await Carrito.find();
exports.getCarritoById = async (id) => await Carrito.findById(id);
exports.createCarrito = async (data) => {
    const carrito = new Carrito(data);
    return await carrito.save();
};
exports.updateCarrito = async (id, data) => await Carrito.findByIdAndUpdate(id, data, { new: true });
exports.deleteCarrito = async (id) => await Carrito.findByIdAndDelete(id);
