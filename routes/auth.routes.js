// level-up-gamer-backend/routes/auth.routes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

const isOver18 = (dateString) => {
    if (!dateString) return false;
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18;
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
    const { name, email, password, birthDate } = req.body;
    if (!name || !email || !password || !birthDate) {
        return res.status(400).json({ message: 'Faltan campos obligatorios.' });
    }
    if (!isOver18(birthDate)) {
        return res.status(400).json({ message: 'Debes ser mayor de 18 años para registrarte.' });
    }
    
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Este email ya está registrado.' });
        }
        
        const newUser = new User({ name, email, password, birthDate });
        await newUser.save();
        
        res.status(201).json({ message: 'Registro Exitoso.' });
    } catch (err) {
        console.error('Error de registro:', err);
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});


// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user || user.password !== password) { 
            return res.status(401).json({ message: 'Email o contraseña incorrectos. Intenta de nuevo.' });
        }
        
        const isDuoc = user.email.toLowerCase().endsWith('@duocuc.cl');
        const discountMessage = isDuoc 
            ? `¡Bienvenido ${user.name}! Tienes un 20% de descuento aplicado.` 
            : `¡Bienvenido ${user.name}!`;

        const userData = {
            id: user._id, 
            name: user.name,
            email: user.email,
        };

        res.json({ 
            message: discountMessage,
            user: userData
        });

    } catch (err) {
        console.error('Error en el login:', err);
        res.status(500).json({ message: 'Error interno del servidor durante el inicio de sesión.' });
    }
});

// GET /api/auth/profile/:email
router.get('/profile/:email', async (req, res) => {
    const userEmail = req.params.email;
    try {
        const user = await User.findOne({ email: userEmail }).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        
        const formattedBirthDate = user.birthDate ? user.birthDate.toISOString().split('T')[0] : '';

        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            birthDate: formattedBirthDate, 
            gender: user.gender,
            address: user.address,
        };
        
        res.json({ user: userData });
    } catch (err) {
        console.error('Error al obtener el perfil:', err);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});


// PATCH /api/auth/profile/:email
router.patch('/profile/:email', async (req, res) => {
    const { name, birthDate, gender, address } = req.body;
    const userEmail = req.params.email;

    try {
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        
        if (name) user.name = name.trim();
        if (birthDate) {
            if (!isOver18(birthDate)) {
                 return res.status(400).json({ message: 'Debes ser mayor de 18 años para registrarte.' });
            }
            user.birthDate = new Date(birthDate);
        }
        if (gender) user.gender = gender;
        if (address) user.address = address;

        await user.save();
        
        const updatedUserData = {
            id: user._id,
            name: user.name,
            email: user.email,
            birthDate: user.birthDate ? user.birthDate.toISOString().split('T')[0] : '', 
            gender: user.gender,
            address: user.address,
        };
        
        res.json({ 
            message: 'Perfil actualizado con éxito.',
            user: updatedUserData
        });
        
    } catch (err) {
        console.error('Error al actualizar el perfil:', err);
        res.status(500).json({ message: 'Error interno del servidor al actualizar el perfil.' });
    }
});

module.exports = router;