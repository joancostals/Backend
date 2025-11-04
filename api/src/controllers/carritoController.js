const carritoService = require('../services/carritoService');

// Crear un nou carrito
const createCarrito = async (req, res) => {
  try {
    const carrito = await carritoService.createCarrito(req.body);
    res.status(201).json({ status: 'success', data: carrito });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Obtenir tots els carritos
const getCarritos = async (req, res) => {
  try {
    const carritos = await carritoService.getCarritos();
    res.status(200).json({ status: 'success', data: carritos });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Obtenir un carrito per ID
const getCarritoById = async (req, res) => {
  try {
    const carrito = await carritoService.getCarritoById(req.params.id);
    if (!carrito) {
      return res.status(404).json({ status: 'error', message: 'Carrito no trobat' });
    }
    res.status(200).json({ status: 'success', data: carrito });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Actualitzar un carrito per ID
const updateCarrito = async (req, res) => {
  try {
    const carrito = await carritoService.updateCarrito(req.params.id, req.body);
    if (!carrito) {
      return res.status(404).json({ status: 'error', message: 'Carrito no trobat' });
    }
    res.status(200).json({ status: 'success', data: carrito });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Eliminar un carrito per ID
const deleteCarrito = async (req, res) => {
  try {
    const carrito = await carritoService.deleteCarrito(req.params.id);
    if (!carrito) {
      return res.status(404).json({ status: 'error', message: 'Carrito no trobat' });
    }
    res.status(200).json({ status: 'success', message: 'Carrito eliminat correctament' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createCarrito,
  getCarritos,
  getCarritoById,
  updateCarrito,
  deleteCarrito,
};
