const express = require('express');
const router = express.Router();
const resenaService = require('../services/resenaService');

/**
 * @swagger
 * tags:
 *   name: Reseñas
 *   description: Gestió de ressenyes de productes
 */

/**
 * @swagger
 * /api/resenas:
 *   get:
 *     summary: Llista totes les ressenyes
 *     tags: [Reseñas]
 *     responses:
 *       200:
 *         description: Llista de ressenyes
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
 *                     $ref: '#/components/schemas/Resena'
 */
router.get('/', async (req, res) => {
    try {
        const resenas = await resenaService.getAllResenas();
        res.json({ status: 'success', data: resenas });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

/**
 * @swagger
 * /api/resenas/{id}:
 *   get:
 *     summary: Obté una ressenya per ID
 *     tags: [Reseñas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalls de la ressenya
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Resena'
 */
router.get('/:id', async (req, res) => {
    try {
        const resena = await resenaService.getResenaById(req.params.id);
        res.json({ status: 'success', data: resena });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

/**
 * @swagger
 * /api/resenas:
 *   post:
 *     summary: Crea una nova ressenya
 *     tags: [Reseñas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resena'
 *     responses:
 *       200:
 *         description: Ressenya creada
 */
router.post('/', async (req, res) => {
    try {
        const resena = await resenaService.createResena(req.body);
        res.json({ status: 'success', data: resena });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

/**
 * @swagger
 * /api/resenas/{id}:
 *   put:
 *     summary: Actualitza una ressenya
 *     tags: [Reseñas]
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
 *             $ref: '#/components/schemas/Resena'
 *     responses:
 *       200:
 *         description: Ressenya actualitzada
 */
router.put('/:id', async (req, res) => {
    try {
        const resena = await resenaService.updateResena(req.params.id, req.body);
        res.json({ status: 'success', data: resena });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

/**
 * @swagger
 * /api/resenas/{id}:
 *   delete:
 *     summary: Elimina una ressenya
 *     tags: [Reseñas]
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
 *         description: Ressenya eliminada
 */
router.delete('/:id', async (req, res) => {
    try {
        await resenaService.deleteResena(req.params.id);
        res.json({ status: 'success', message: 'Resena eliminada' });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});


module.exports = router;
