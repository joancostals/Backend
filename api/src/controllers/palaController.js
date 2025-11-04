const Pala = require('../models/Pala');

// ➕ Crear una nova pala
exports.createPala = async (req, res) => {
  try {
    const pala = await Pala.create(req.body);
    res.status(201).json({ status: 'success', data: pala });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// 📋 Obtenir totes les pales
exports.getPales = async (req, res) => {
  try {
    const pales = await Pala.find();
    res.json({ status: 'success', data: pales });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 🔍 Obtenir una pala per ID
exports.getPalaById = async (req, res) => {
  try {
    const pala = await Pala.findById(req.params.id);
    if (!pala) return res.status(404).json({ status: 'error', message: 'Pala no trobada' });
    res.json({ status: 'success', data: pala });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// ✏️ Actualitzar una pala
exports.updatePala = async (req, res) => {
  try {
    const pala = await Pala.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ status: 'success', data: pala });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// ❌ Eliminar una pala
exports.deletePala = async (req, res) => {
  try {
    await Pala.findByIdAndDelete(req.params.id);
    res.json({ status: 'success', message: 'Pala eliminada correctament' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
