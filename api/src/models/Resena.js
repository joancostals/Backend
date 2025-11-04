const mongoose = require('mongoose');

const resenaSchema = new mongoose.Schema({
  id_reseña: {
    type: String,
    required: true,
    unique: true
  },
  id_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  id_pala: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pala',
    required: true
  },
  comentario: {
    type: String,
    required: true
  },
  puntuacion: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resena', resenaSchema);
