const mongoose = require('mongoose');

const palaSchema = new mongoose.Schema({
    id_pala: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    marca: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true }
});

module.exports = mongoose.model('Pala', palaSchema);