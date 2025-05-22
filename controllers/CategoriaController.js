const Categoria = require('../models/Categoria');

const categorias = [];

module.exports = {
  listarCategorias: (req, res) => {
    res.json(categorias);
  },

  criarCategoria: (req, res) => {
    const { nome } = req.body;
    const novaCategoria = new Categoria(Date.now(), nome);
    categorias.push(novaCategoria);
    res.status(201).json(novaCategoria);
  }
};
