const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/CategoriaController');

router.get('/', CategoriaController.listarCategorias);
router.post('/', CategoriaController.criarCategoria);

module.exports = router;
