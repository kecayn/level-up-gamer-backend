require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI no está definido en .env');
    process.exit(1);
  }
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Conexion a MongoDB exitosa');
  } catch (err) {
    console.error('Error al conectar a MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
