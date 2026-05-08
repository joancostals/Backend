const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    id_pedido: { type: String, required: true, unique: true },
    id_usuario: { type: String, required: true },
    items: [
        {
            id_pala: { type: String, required: true },
            nombre: { type: String },
            precio_unitario: { type: Number, required: true },
            cantidad: { type: Number, required: true }
        }
    ],
    detallesEnvio: {
        nombre: { type: String, required: true },
        apellidos: { type: String, required: true },
        correo: { type: String, required: true },
        direccion: { type: String, required: true }
    },
    total: { type: Number, required: true },
    fecha: { type: Date, default: Date.now },
    estado: { type: String, enum: ['pending', 'paid', 'completado', 'pendiente', 'enviado', 'entregado', 'finalizado'], default: 'pending' }
});

module.exports = mongoose.model('Pedido', pedidoSchema);
