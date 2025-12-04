// level-up-gamer-backend/server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/database'); 

require('dotenv').config();

// Rutas de la API (Debes crearlas en la carpeta 'routes')
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');

const app = express();
const PORT = process.env.PORT || 3001; 

// Conectar a MongoDB
connectDB();

// Middlewares para CORS y manejo de JSON
app.use(cors({
  // Permite que React (en puerto 3000) se comunique con este servidor
  origin: 'http://localhost:3000' 
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);     
app.use('/api/products', productRoutes); 

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({ 
    mensaje: '✅ API de Level-Up-Gamer corriendo',
    endpoints: {
      productos: 'GET /api/products',
      registro: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      perfil: 'GET/PATCH /api/auth/profile/:email'
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
});