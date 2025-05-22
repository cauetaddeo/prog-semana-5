const express = require('express');
const router = express.Router();
const TarefaController = require('../controllers/TarefaController');

// Rota para renderizar a página
router.get('/', TarefaController.renderTarefas);

// API Routes
router.get('/api', TarefaController.listarTarefas);
router.post('/api', TarefaController.criarTarefa);
router.put('/api/:id', TarefaController.editarTarefa);
router.delete('/api/:id', TarefaController.excluirTarefa);

module.exports = router;