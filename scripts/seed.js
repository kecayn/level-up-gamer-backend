// level-up-gamer-backend/scripts/seed.js

const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Product = require('../models/Product');
require('dotenv').config();

const initialProducts = [
    {
        name: 'Teclado Mecánico RGB',
        description: 'Teclado de alto rendimiento con switches Blue, ideal para gaming competitivo.',
        price: 59.99,
        image: '/imagenes/Teclado.jpg',
        category: 'Periféricos',
        stock: 50
    },
    {
        name: 'Silla Gamer Ergonómica XL',
        description: 'Máximo confort para largas sesiones de juego. Soporte lumbar y cervical.',
        price: 199.99,
        image: '/imagenes/Silla-Gamer.jpg',
        category: 'Mobiliario',
        stock: 15
    },
    {
        name: 'Monitor Curvo 27" 144Hz',
        description: 'Pantalla curva de 27 pulgadas, 1ms de respuesta y 144Hz para una experiencia fluida.',
        price: 289.99,
        image: '/imagenes/Monitor.jpg',
        category: 'Monitores',
        stock: 25
    },
    {
        name: 'Mouse Óptico Inalámbrico',
        description: 'Mouse ligero con 16000 DPI, batería de larga duración y botones programables.',
        price: 45.00,
        image: '/imagenes/Mause.jpg',
        category: 'Periféricos',
        stock: 70
    },
    {
        name: 'Audífonos Gamer Inmersivos',
        description: 'Sonido envolvente 7.1 y micrófono con cancelación de ruido.',
        price: 79.50,
        image: '/imagenes/Audifonos.jpg',
        category: 'Audio',
        stock: 40
    },
    {
        name: 'Set de Juegos de Mesa Catan',
        description: 'El clásico de estrategia y comercio, perfecto para reuniones.',
        price: 40.00,
        image: '/imagenes/Catan.jpg',
        category: 'Juegos',
        stock: 30
    },
    {
        name: 'Controlador Inalámbrico para Consola',
        description: 'Controlador ergonómico de alta precisión compatible con varias consolas.',
        price: 65.00,
        image: '/imagenes/Consolas.jpg', 
        category: 'Accesorios',
        stock: 35
    },
    {
        name: 'Juego Estreno: Cyberpunk 2077',
        description: 'El aclamado RPG de mundo abierto, ambientado en un futuro distópico.',
        price: 50.99,
        image: '/imagenes/Juegos.jpg', 
        category: 'Juegos',
        stock: 60
    }
];

const seedDB = async () => {
    // La función connectDB se encarga de conectar
    await connectDB(); 
    try {
        console.log('Limpiando la colección de productos existente...');
        await Product.deleteMany({});
        
        console.log('Insertando productos iniciales...');
        await Product.insertMany(initialProducts);
        
        console.log(' Base de datos de productos poblada con éxito.');
    } catch (error) {
        console.error(' Error durante la carga inicial de datos:', error);
    } finally {
        mongoose.connection.close();
        console.log('Cerrada conexión a MongoDB.');
    }
};

seedDB();