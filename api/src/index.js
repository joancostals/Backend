require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoute');
const pedidoRoutes = require('./routes/pedidoRoute');
const palaRoutes = require('./routes/palaRoute');
const resenaRoutes = require('./routes/resenaRoute');
const carritoRoutes = require('./routes/carritoRoute');
const authRoutes = require('./routes/authRoutes');





const app = express();
const cors = require('cors'); // Import CORS
const swaggerUi = require('swagger-ui-express'); 
const swaggerSpec = require('./docs/swagger'); 
app.use(cors()); // Enable CORS

// Stripe Webhook necessita body raw format (Buffer)
const checkoutController = require('./controllers/checkoutController');
app.post('/api/checkout/webhook', express.raw({ type: 'application/json' }), checkoutController.webhook);

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
app.use('/api/auth', authRoutes);

const checkoutRoutes = require('./routes/checkoutRoutes');
app.use('/api/checkout', checkoutRoutes);

// Swagger Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en marxa al port ${PORT}`));

