const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

router.get('/', UsuarioController.listarUsuarios);
router.post('/', UsuarioController.criarUsuario);

module.exports = router;
