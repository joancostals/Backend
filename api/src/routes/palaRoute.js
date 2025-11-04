const express = require('express');
const router = express.Router();
const palaController = require('../controllers/palaController');

router.post('/', palaController.createPala);
router.get('/', palaController.getPales);
router.get('/:id', palaController.getPalaById);
router.put('/:id', palaController.updatePala);
router.delete('/:id', palaController.deletePala);

module.exports = router;
