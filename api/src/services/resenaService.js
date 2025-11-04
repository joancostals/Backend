const Resena = require('../models/Resena');

// Crear una nova reseña
const createResena = async (resenaData) => {
  const newResena = new Resena(resenaData);
  return await newResena.save();
};

// Obtenir totes les reseñas
const getResenas = async () => {
  return await Resena.find().populate('id_usuario').populate('id_pala');
};

// Obtenir una reseña per ID
const getResenaById = async (id) => {
  return await Resena.findById(id).populate('id_usuario').populate('id_pala');
};

// Actualitzar una reseña per ID
const updateResena = async (id, updateData) => {
  return await Resena.findByIdAndUpdate(id, updateData, { new: true });
};

// Eliminar una reseña
const deleteResena = async (id) => {
  return await Resena.findByIdAndDelete(id);
};

module.exports = {
  createResena,
  getResenas,
  getResenaById,
  updateResena,
  deleteResena
};
