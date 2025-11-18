const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    id_pedido: { type: String, required: true, unique: true },
    id_usuario: { type: String, required: true },
    id_pala: { type: String, required: true },
    cantidad: { type: Number, required: true },
    precio_unitario: { type: Number, required: true },
    total: { type: Number, required: true },
    fecha: { type: Date, default: Date.now },
    estado: { type: String, enum: ['pendiente','enviado','entregado'], default: 'pendiente' }
});

module.exports = mongoose.model('Pedido', pedidoSchema);
