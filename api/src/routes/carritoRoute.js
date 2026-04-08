const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');
const authenticateToken = require('../middlewares/authMiddleware');

// Aplicar el middleware de autenticación a todas las rutas de este router
router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Carrito
 *   description: Gestió del carret de la compra
 */

/**
 * @swagger
 * /api/carritos:
 *   get:
 *     summary: Obté el carret de l'usuari actual
 *     tags: [Carrito]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: El carret de l'usuari
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carrito'
 */
router.get('/', carritoController.getCarrito);

/**
 * @swagger
 * /api/carritos/add/{id_pala}:
 *   post:
 *     summary: Afegeix un producte al carret
 *     tags: [Carrito]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_pala
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cantidad:
 *                 type: number
 *                 default: 1
 *     responses:
 *       200:
 *         description: Producte afegit
 */
router.post('/add/:id_pala', carritoController.addItem);

/**
 * @swagger
 * /api/carritos/remove/{id_pala}:
 *   delete:
 *     summary: Elimina un producte del carret
 *     tags: [Carrito]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_pala
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producte eliminat del carret
 */
router.delete('/remove/:id_pala', carritoController.removeItem);

/**
 * @swagger
 * /api/carritos/clear:
 *   delete:
 *     summary: Buida el carret completament
 *     tags: [Carrito]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carret buidat
 */
router.delete('/clear', carritoController.clearCarrito);


module.exports = router;