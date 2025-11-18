const mongoose = require('mongoose');

const palaSchema = new mongoose.Schema({
  id_pala: {
    type: String,
    required: true,
    unique: true
  },
  peso: {
    type: Number,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  imagenes: {
    type: [String],
    default: []
  },
  marca: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  descripcion: {
    type: String
  },
  tipo: {
    type: String
  }
});

module.exports = mongoose.model('Pala', palaSchema);
