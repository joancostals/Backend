const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');
const authenticateToken = require('../middlewares/authMiddleware');

// Aplicar el middleware de autenticación a todas las rutas de este router
router.use(authenticateToken);

// Obtener carrito
router.get('/', carritoController.getCarrito);

// Añadir producto
router.post('/add/:id_pala', carritoController.addItem);

// Eliminar producto
router.delete('/remove/:id_pala', carritoController.removeItem);

// Vaciar carrito
router.delete('/clear', carritoController.clearCarrito);

module.exports = router;