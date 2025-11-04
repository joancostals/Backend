const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  id_pedido: {
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
    type: String,
    required: true
  },
  cantidad: {
    type: Number,
    required: true,
    min: 1
  },
  precio_unitario: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    enum: ['pendiente', 'enviado', 'entregado', 'cancelado'],
    default: 'pendiente'
  },
  total: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Pedido', pedidoSchema);
