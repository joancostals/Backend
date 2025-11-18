const mongoose = require('mongoose');

const resenaSchema = new mongoose.Schema({
    id_reseña: { type: String, required: true, unique: true },
    id_usuario: { type: String, required: true },
    id_pala: { type: String, required: true },
    comentario: { type: String },
    puntuacion: { type: Number, required: true },
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resena', resenaSchema);
