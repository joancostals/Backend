const mongoose = require('mongoose');

const palaSchema = new mongoose.Schema({
    id_pala: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    peso: { type: Number, required: true },
    stock: { type: Number, required: true },
    imagenes: [{ type: String }],
    marca: { type: String, required: true },
    precio: { type: Number, required: true },
    descripcion: { type: String },
    tipo: { type: String }
});

module.exports = mongoose.model('Pala', palaSchema);
