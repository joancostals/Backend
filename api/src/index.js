require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoute');
const pedidoRoutes = require('./routes/pedidoRoute');
const palaRoutes = require('./routes/palaRoute');
const resenaRoutes = require('./routes/resenaRoute');
const carritoRoutes = require('./routes/carritoRoute');





const app = express();
app.use(express.json());

// Connexió a la base de dades
connectDB();

// Ruta base
app.get('/', (req, res) => res.send('API Ecommerce amb entitat Usuari en marxa 🚀'));

// Prefix per a usuaris
app.use('/api/users', userRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/palas', palaRoutes);
app.use('/api/resenas', resenaRoutes);
app.use('/api/carritos', carritoRoutes);




// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en marxa al port ${PORT}`));
