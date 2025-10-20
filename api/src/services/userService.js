const User = require('../models/User');

// Crear un nou usuari
const createUser = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

// Obtenir tots els usuaris
const getAllUsers = async () => {
  return await User.find();
};

// Obtenir un usuari per ID
const getUserById = async (id) => {
  return await User.findById(id);
};

// Actualitzar un usuari per ID
const updateUser = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

// Eliminar un usuari per ID
const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
