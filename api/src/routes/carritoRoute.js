const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');

router.get('/', carritoController.getCarritos);
router.get('/:id', carritoController.getCarritoById);
router.post('/', carritoController.createCarrito);
router.put('/:id', carritoController.updateCarrito);
router.delete('/:id', carritoController.deleteCarrito);

module.exports = router;
