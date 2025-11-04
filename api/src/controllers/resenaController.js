const resenaService = require('../services/resenaService');

// POST - Crear reseña
const createResena = async (req, res) => {
  try {
    const resena = await resenaService.createResena(req.body);
    res.status(201).json({ status: 'success', data: resena });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// GET - Obtenir totes les reseñas
const getResenas = async (req, res) => {
  try {
    const resenas = await resenaService.getResenas();
    res.status(200).json({ status: 'success', data: resenas });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// GET/:id - Obtenir reseña per ID
const getResenaById = async (req, res) => {
  try {
    const resena = await resenaService.getResenaById(req.params.id);
    if (!resena) {
      return res.status(404).json({ status: 'error', message: 'Reseña no trobada' });
    }
    res.status(200).json({ status: 'success', data: resena });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// PUT/:id - Actualitzar reseña
const updateResena = async (req, res) => {
  try {
    const resena = await resenaService.updateResena(req.params.id, req.body);
    if (!resena) {
      return res.status(404).json({ status: 'error', message: 'Reseña no trobada' });
    }
    res.status(200).json({ status: 'success', data: resena });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// DELETE/:id - Eliminar reseña
const deleteResena = async (req, res) => {
  try {
    const resena = await resenaService.deleteResena(req.params.id);
    if (!resena) {
      return res.status(404).json({ status: 'error', message: 'Reseña no trobada' });
    }
    res.status(200).json({ status: 'success', message: 'Reseña eliminada correctament' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createResena,
  getResenas,
  getResenaById,
  updateResena,
  deleteResena
};
