const Pala = require('../models/Pala');

// Crear una nova pala
const createPala = async (palaData) => {
  const newPala = new Pala(palaData);
  return await newPala.save();
};

// Obtenir totes les pales
const getPales = async () => {
  return await Pala.find();
};

// Obtenir una pala per ID
const getPalaById = async (id) => {
  return await Pala.findById(id);
};

// Actualitzar una pala
const updatePala = async (id, updateData) => {
  return await Pala.findByIdAndUpdate(id, updateData, { new: true });
};

// Eliminar una pala
const deletePala = async (id) => {
  return await Pala.findByIdAndDelete(id);
};

module.exports = {
  createPala,
  getPales,
  getPalaById,
  updatePala,
  deletePala
};
