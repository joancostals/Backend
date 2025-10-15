const mongoose = require('mongoose');

// Esquema del producto (pala)
const productoSchema = new mongoose.Schema({
    id_pala: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    nombre: {
        type: String,
        required: [true, 'El nombre de la pala es obligatorio'],
        minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
        maxlength: [100, 'El nombre no puede superar 100 caracteres'],
        trim: true
    },
    peso: {
        type: Number,
        required: true,
        min: [250, 'El peso mínimo de la pala es 250g'],
        max: [400, 'El peso máximo de la pala es 400g']
    },
    stock: {
        type: Number,
        required: true,
        min: [0, 'El stock no puede ser negativo']
    },
    imagenes: {
        type: [String], // Array d'URLs
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: 'Debe haber al menos una imagen'
        }
    },
    marca: {
        type: String,
        required: true,
        maxlength: [50, 'La marca no puede superar 50 caracteres']
    },
    precio: {
        type: Number,
        required: true,
        min: [0, 'El precio no puede ser negativo']
    },
    descripcion: {
        type: String,
        maxlength: [500, 'La descripción no puede superar 500 caracteres']
    },
    tipo: {
        type: String,
        enum: ['control', 'potencia', 'mixta'],
        required: true
    }
});

// Exportar modelo
module.exports = mongoose.model('Producto', productoSchema);
