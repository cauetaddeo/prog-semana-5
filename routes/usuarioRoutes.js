const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

// Rota para renderizar a página de usuários
router.get('/', UsuarioController.renderUsuarios);

// API Routes
router.get('/', UsuarioController.listarUsuarios);
router.post('/', UsuarioController.criarUsuario);
router.get('/:id', UsuarioController.obterUsuario);
router.put('/:id', UsuarioController.atualizarUsuario);
router.delete('/:id', UsuarioController.excluirUsuario);

module.exports = router;