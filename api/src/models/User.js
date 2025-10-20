const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: ['admin', 'cliente'],
    default: 'cliente',
  },
  direccion: {
    type: String,
  },
  telefono: {
    type: String,
  },
  fecha_registro: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
    