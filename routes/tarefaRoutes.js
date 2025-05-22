const express = require('express');
const router = express.Router();
const TarefaController = require('../controllers/TarefaController');

router.get('/', TarefaController.listarTarefas);
router.post('/', TarefaController.criarTarefa);

module.exports = router;
