const express = require('express');
const router = express.Router();
const resenaService = require('../services/resenaService');

// GET totes les resenas
router.get('/', async (req, res) => {
    try {
        const resenas = await resenaService.getAllResenas();
        res.json({ status: 'success', data: resenas });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// GET resena per ID
router.get('/:id', async (req, res) => {
    try {
        const resena = await resenaService.getResenaById(req.params.id);
        res.json({ status: 'success', data: resena });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// POST crear resena
router.post('/', async (req, res) => {
    try {
        const resena = await resenaService.createResena(req.body);
        res.json({ status: 'success', data: resena });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

// PUT actualitzar resena per ID
router.put('/:id', async (req, res) => {
    try {
        const resena = await resenaService.updateResena(req.params.id, req.body);
        res.json({ status: 'success', data: resena });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

// DELETE resena per ID
router.delete('/:id', async (req, res) => {
    try {
        await resenaService.deleteResena(req.params.id);
        res.json({ status: 'success', message: 'Resena eliminada' });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

module.exports = router;
