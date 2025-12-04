// level-up-gamer-backend/models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio.'], 
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio.'],
        unique: true, 
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Formato de email incorrecto.']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria.']
    },
    birthDate: {
        type: Date,
        required: [true, 'La fecha de nacimiento es obligatoria.']
    },
    gender: {
        type: String,
        enum: ['Masculino', 'Femenino', 'Otro', 'No especificado'],
        default: 'No especificado'
    },
    address: {
        type: String
    }
}, { timestamps: true }); 

module.exports = mongoose.model('User', UserSchema);