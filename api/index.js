// Importación de módulos de versiones anteriores
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usuariosRoutes = require('./routes/usuariosRoutes');
const productosRoutes = require('./routes/productosRoutes');
const authRoutes = require('./routes/authRoutes');
const mensajesRoutes = require('./routes/mensajesRoutes');
const ventasRoutes = require('./routes/ventasRoutes');
// crear el servidor
const app = express();

// Permitir acceso, cors
app.use(cors());

//Conectar a mongodb
mongoose.connect(process.env.MONGO_URL);

// Habilitar express.json (tambien se puede usar body parser)
app.use(express.json({ extended: true }));
// Habilitar urlencoded, para consultas desde postman en este formato
app.use(express.urlencoded({ extended: true }));

//importar rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/mensajes', mensajesRoutes);
app.use('/api/ventas', ventasRoutes);

// puerto y arranque del servidor
app.listen(process.env.PORT || 4000, () => {
    console.log('Servidor Funcionando');
});
