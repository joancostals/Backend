const mongoose = require('mongoose');

const palaSchema = new mongoose.Schema({
  id_pala: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  peso: { type: Number, required: true },
  stock: { type: Number, required: true },
  imagenes: { type: [String], default: [] },
  marca: { type: String, required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String },
  tipo: { type: String, enum: ['control', 'potencia', 'equilibrada'], default: 'control' },
  fecha_registro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pala', palaSchema);
