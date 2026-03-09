const palaService = require('../services/palaService');

exports.getAllPalas = async (req, res) => {
    try {
        const palas = await palaService.getAllPalas();
        res.json(palas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPalaById = async (req, res) => {
    try {
        const pala = await palaService.getPalaById(req.params.id);
        res.json(pala);
    } catch (err) {
        res.status(404).json({ message: 'Pala no encontrada' });
    }
};

exports.createPala = async (req, res) => {
    try {
        const pala = await palaService.createPala(req.body);
        res.status(201).json(pala);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updatePala = async (req, res) => {
    try {
        const pala = await palaService.updatePala(req.params.id, req.body);
        res.json(pala);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deletePala = async (req, res) => {
    try {
        await palaService.deletePala(req.params.id);
        res.json({ message: 'Pala eliminada' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};