const Usuario = require('../models/Usuario');

const usuarios = []; // Simulando um banco em memória

module.exports = {
  listarUsuarios: (req, res) => {
    res.json(usuarios);
  },

  criarUsuario: (req, res) => {
    const { nome, email, senha } = req.body;
    const novoUsuario = new Usuario(Date.now(), nome, email, senha);
    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
  }
};
