const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
    id_carrito: { type: String, required: true, unique: true },
    id_usuario: { type: String, required: true },
    items: [{ id_pala: String, cantidad: Number }]
});

module.exports = mongoose.model('Carrito', carritoSchema);
