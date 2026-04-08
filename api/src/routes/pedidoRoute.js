const express = require('express');
const router = express.Router();
const pedidoService = require('../services/pedidoService');
const pedidoController = require('../controllers/pedidoController');
const authenticateToken = require('../middlewares/authMiddleware');

router.use(authenticateToken); // Proteger todas las rutas de pedidos

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Gestió de comandes
 */

/**
 * @swagger
 * /api/pedidos/checkout:
 *   post:
 *     summary: Crea un pedido des del carret (Checkout)
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pedido creat correctament
 */
router.post('/checkout', pedidoController.checkout);

/**
 * @swagger
 * /api/pedidos:
 *   get:
 *     summary: Llista tots els pedidos
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Llista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pedido'
 */
router.get('/', async (req, res) => {
    try {
        const pedidos = await pedidoService.getAllPedidos();
        res.json({ status: 'success', data: pedidos });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

/**
 * @swagger
 * /api/pedidos/{id}:
 *   get:
 *     summary: Obté un pedido per ID
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalls del pedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Pedido'
 */
router.get('/:id', async (req, res) => {
    try {
        const pedido = await pedidoService.getPedidoById(req.params.id);
        res.json({ status: 'success', data: pedido });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

/**
 * @swagger
 * /api/pedidos:
 *   post:
 *     summary: Crea un nou pedido manualment
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pedido'
 *     responses:
 *       200:
 *         description: Pedido creat
 */
router.post('/', async (req, res) => {
    try {
        const pedido = await pedidoService.createPedido(req.body);
        res.json({ status: 'success', data: pedido });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

/**
 * @swagger
 * /api/pedidos/{id}:
 *   put:
 *     summary: Actualitza un pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pedido'
 *     responses:
 *       200:
 *         description: Pedido actualitzat
 */
router.put('/:id', async (req, res) => {
    try {
        const pedido = await pedidoService.updatePedido(req.params.id, req.body);
        res.json({ status: 'success', data: pedido });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

/**
 * @swagger
 * /api/pedidos/{id}:
 *   delete:
 *     summary: Elimina un pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido eliminat
 */
router.delete('/:id', async (req, res) => {
    try {
        await pedidoService.deletePedido(req.params.id);
        res.json({ status: 'success', message: 'Pedido eliminat' });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});


module.exports = router;
