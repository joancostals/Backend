const userService = require('../services/userService');

// POST /api/users
const createUsuario = async (req, res) => {
  try {
    const usuario = await userService.createUsuario(req.body);
    res.status(201).json({ status: 'success', data: usuario });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// GET /api/users
const getUsuarios = async (_req, res) => {
  try {
    const usuarios = await userService.getUsuarios();
    res.status(200).json({ status: 'success', data: usuarios });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// GET /api/users/:id  (id_usuario)
const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await userService.getUsuarioByIdUsuario(id);
    if (!usuario) {
      return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
    }
    res.status(200).json({ status: 'success', data: usuario });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// PUT /api/users/:id  (id_usuario)
const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioActualizado = await userService.updateUsuario(id, req.body);
    if (!usuarioActualizado) {
      return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
    }
    res.status(200).json({ status: 'success', data: usuarioActualizado });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// DELETE /api/users/:id  (id_usuario)
const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await userService.deleteUsuario(id);
    if (!eliminado) {
      return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
    }
    res.status(200).json({ status: 'success', message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createUsuario,
  getUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
};
