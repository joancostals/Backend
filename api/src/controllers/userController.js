const userService = require('../services/userService')

// POST - Crear usuari
const createUsuario = async (req, res) => {
  try {
    const user = await userService.createUsuario(req.body);
    res.status(201).json({ status: 'success', data: user });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// GET - Obtenir tots els usuaris
const getUsuario = async (req, res) => {
  try {
    const users = await userService.getUsuarios();
    res.status(200).json({ status: 'success', data: users });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// GET/:id - Obtenir un usuari per ID
const getUsuarioById = async (req, res) => {
  try {
    const user = await userService.getUsuarioById(req.params.id);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'Usuari no trobat' });
    }
    res.status(200).json({ status: 'success', data: user });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// PUT/:id - Actualitzar usuari
const updateUsuario = async (req, res) => {
  try {
    const user = await userService.updateUsuario(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'Usuari no trobat' });
    }
    res.status(200).json({ status: 'success', data: user });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// DELETE/:id - Eliminar usuari
const deleteUsuario = async (req, res) => {
  try {
    const user = await userService.deleteUsuario(req.params.id);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'Usuari no trobat' });
    }
    res.status(200).json({ status: 'success', message: 'Usuari eliminat correctament' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createUsuario,
  getUsuario,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
};
