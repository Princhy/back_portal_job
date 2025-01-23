const express = require('express');
const router = express.Router();
const entiteController = require('../controllers/entiteController');

router.post('/', entiteController.create);
router.get('/', entiteController.getAll);
router.get('/:id', entiteController.getById);
router.put('/:id', entiteController.update);
router.delete('/:id', entiteController.delete);

module.exports = router;