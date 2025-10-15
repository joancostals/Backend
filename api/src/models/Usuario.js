const mongoose = require('mongoose');

// Esquema del usuario
const usuarioSchema = new mongoose.Schema({
    id_usuario: {
        type: String,
        required: true,
        unique: true, // Evita IDs duplicats
        index: true
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
        maxlength: [50, 'El nombre no puede superar 50 caracteres'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        match: [/.+\@.+\..+/, 'Formato de email inválido'],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    rol: {
        type: String,
        enum: ['usuario', 'admin'],
        default: 'usuario'
    },
    telefono: {
        type: String,
        match: [/^\d{9,15}$/, 'El teléfono debe tener entre 9 y 15 dígitos']
    },
    direccion: {
        type: String,
        maxlength: [100, 'La dirección no puede superar 100 caracteres']
    },
    fecha_registro: {
        type: Date,
        default: Date.now
    }
});

// Exportar modelo
module.exports = mongoose.model('Usuario', usuarioSchema);
