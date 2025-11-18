const palaService = require('../services/palaService');

exports.getAllPalas = async (req, res) => {
    try {
        const palas = await palaService.getAllPalas();
        res.json({ status: 'success', data: palas });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getPalaById = async (req, res) => {
    try {
        const pala = await palaService.getPalaById(req.params.id);
        res.json({ status: 'success', data: pala });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.createPala = async (req, res) => {
    try {
        const newPala = await palaService.createPala(req.body);
        res.status(201).json({ status: 'success', data: newPala });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.updatePala = async (req, res) => {
    try {
        const updatedPala = await palaService.updatePala(req.params.id, req.body);
        res.json({ status: 'success', data: updatedPala });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.deletePala = async (req, res) => {
    try {
        await palaService.deletePala(req.params.id);
        res.json({ status: 'success', message: 'Pala eliminada' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
