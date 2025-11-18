const resenaService = require('../services/resenaService');

exports.getAllResenas = async (req, res) => {
    try {
        const resenas = await resenaService.getAllResenas();
        res.json({ status: 'success', data: resenas });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getResenaById = async (req, res) => {
    try {
        const resena = await resenaService.getResenaById(req.params.id);
        res.json({ status: 'success', data: resena });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.createResena = async (req, res) => {
    try {
        const newResena = await resenaService.createResena(req.body);
        res.status(201).json({ status: 'success', data: newResena });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.updateResena = async (req, res) => {
    try {
        const updatedResena = await resenaService.updateResena(req.params.id, req.body);
        res.json({ status: 'success', data: updatedResena });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.deleteResena = async (req, res) => {
    try {
        await resenaService.deleteResena(req.params.id);
        res.json({ status: 'success', message: 'Reseña eliminada' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
