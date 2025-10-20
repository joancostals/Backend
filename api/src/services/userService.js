// const { createUsuario } = require('../controllers/userController')
const User = require('../models/User')

// Crear un nou usuari
const createUsuario = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

// Obtenir tots els usuaris
const getUsuarios = async () => {
  return await User.find();
};

// Obtenir un usuari per ID
const getUsuarioById = async (id) => {
  return await User.findById(id);
};

// Actualitzar un usuari per ID
const updateUsuario = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

// Eliminar un usuari per ID
const deleteUsuario = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  createUsuario,
  getUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
};