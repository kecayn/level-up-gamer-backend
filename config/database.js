// level-up-gamer-backend/config/database.js

const mongoose = require('mongoose');

// Carga la variable MONGODB_URI desde el archivo .env
const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  if (!MONGODB_URI) {
     console.error('❌ Error: MONGODB_URI no está definido en el archivo .env');
     process.exit(1);
  }
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('🔗 Conexión a MongoDB exitosa.');
  } catch (err) {
    console.error('❌ Error al conectar a MongoDB:', err.message);
    process.exit(1); 
  }
};

module.exports = connectDB;