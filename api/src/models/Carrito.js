const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
  id_carrito: {
    type: String,
    required: true,
    unique: true
  },
  id_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      id_pala: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pala',
        required: true
      },
      cantidad: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ]
});

module.exports = mongoose.model('Carrito', carritoSchema);
