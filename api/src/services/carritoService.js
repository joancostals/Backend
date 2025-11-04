const Carrito = require('../models/Carrito');

// Crear un nou carrito
const createCarrito = async (carritoData) => {
  const newCarrito = new Carrito(carritoData);
  return await newCarrito.save();
};

// Obtenir tots els carritos
const getCarritos = async () => {
  return await Carrito.find().populate('id_usuario').populate('items.id_pala');
};

// Obtenir un carrito per ID
const getCarritoById = async (id) => {
  return await Carrito.findById(id).populate('id_usuario').populate('items.id_pala');
};

// Actualitzar un carrito per ID
const updateCarrito = async (id, updateData) => {
  return await Carrito.findByIdAndUpdate(id, updateData, { new: true });
};

// Eliminar un carrito
const deleteCarrito = async (id) => {
  return await Carrito.findByIdAndDelete(id);
};

module.exports = {
  createCarrito,
  getCarritos,
  getCarritoById,
  updateCarrito,
  deleteCarrito
};
