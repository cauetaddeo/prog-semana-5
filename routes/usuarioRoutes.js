const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

// Rota para renderizar a página de usuários
router.get('/', UsuarioController.renderUsuarios);

// API Routes
router.get('/api', UsuarioController.listarUsuarios);
router.post('/api', UsuarioController.criarUsuario);
router.get('/api/:id', UsuarioController.obterUsuario);
router.put('/api/:id', UsuarioController.atualizarUsuario);
router.delete('/api/:id', UsuarioController.excluirUsuario);

module.exports = router;