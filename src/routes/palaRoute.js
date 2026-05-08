const express = require('express');
const router = express.Router();
const palaService = require('../services/palaService');
const authenticateToken = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

/**
 * @swagger
 * /api/palas:
 *   get:
 *     summary: Obté totes les pales
 *     tags: [Palas]
 *     responses:
 *       200:
 *         description: Llista de pales
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
 *                     $ref: '#/components/schemas/Pala'
 */
router.get('/', async (req, res) => {
    try {
        const palas = await palaService.getAllPalas();
        res.json({ status: 'success', data: palas });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

/**
 * @swagger
 * /api/palas/{id}:
 *   get:
 *     summary: Obté una pala per ID
 *     tags: [Palas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la pala
 *     responses:
 *       200:
 *         description: Detalls de la pala
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Pala'
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', async (req, res) => {
    try {
        const pala = await palaService.getPalaById(req.params.id);
        res.json({ status: 'success', data: pala });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

/**
 * @swagger
 * /api/palas:
 *   post:
 *     summary: Crea una nova pala (Admin)
 *     tags: [Palas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pala'
 *     responses:
 *       200:
 *         description: Pala creada correctament
 *       400:
 *         description: Dades invàlides
 */
router.post('/', authenticateToken, roleMiddleware('admin'), async (req, res) => {
    try {
        const pala = await palaService.createPala(req.body);
        res.json({ status: 'success', data: pala });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

/**
 * @swagger
 * /api/palas/{id}:
 *   put:
 *     summary: Actualitza una pala (Admin)
 *     tags: [Palas]
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
 *             $ref: '#/components/schemas/Pala'
 *     responses:
 *       200:
 *         description: Pala actualitzada
 */
router.put('/:id', authenticateToken, roleMiddleware('admin'), async (req, res) => {
    try {
        const pala = await palaService.updatePala(req.params.id, req.body);
        res.json({ status: 'success', data: pala });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

/**
 * @swagger
 * /api/palas/{id}:
 *   delete:
 *     summary: Elimina una pala (Admin)
 *     tags: [Palas]
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
 *         description: Pala eliminada
 */
router.delete('/:id', authenticateToken, roleMiddleware('admin'), async (req, res) => {
    try {
        await palaService.deletePala(req.params.id);
        res.json({ status: 'success', message: 'Pala eliminada' });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});


module.exports = router;
