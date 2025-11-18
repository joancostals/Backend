const express = require('express');
const router = express.Router();
const palaService = require('../services/palaService');

// GET totes les palas
router.get('/', async (req, res) => {
    try {
        const palas = await palaService.getAllPalas();
        res.json({ status: 'success', data: palas });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// GET pala per ID
router.get('/:id', async (req, res) => {
    try {
        const pala = await palaService.getPalaById(req.params.id);
        res.json({ status: 'success', data: pala });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// POST crear pala
router.post('/', async (req, res) => {
    try {
        const pala = await palaService.createPala(req.body);
        res.json({ status: 'success', data: pala });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

// PUT actualitzar pala per ID
router.put('/:id', async (req, res) => {
    try {
        const pala = await palaService.updatePala(req.params.id, req.body);
        res.json({ status: 'success', data: pala });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

// DELETE pala per ID
router.delete('/:id', async (req, res) => {
    try {
        await palaService.deletePala(req.params.id);
        res.json({ status: 'success', message: 'Pala eliminada' });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

module.exports = router;
