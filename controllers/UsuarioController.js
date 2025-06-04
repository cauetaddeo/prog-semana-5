const Usuario = require('../models/Usuario');

const usuarios = []; // Simulando um banco em memória

module.exports = {
  // Renderizar página de usuários
  renderUsuarios: (req, res) => {
    res.render('usuarios/index', {
      usuarios: usuarios,
      pageTitle: 'Gerenciar Usuários'
    });
  },

  // API - Listar usuários (JSON)
  listarUsuarios: (req, res) => {
    res.json(usuarios);
  },

  // API - Criar usuário
  criarUsuario: (req, res) => {
    const { nome, email, senha } = req.body;
    
    // Validações básicas
    if (!nome || !email || !senha) {
      return res.status(400).json({ 
        error: 'Nome, email e senha são obrigatórios' 
      });
    }
    
    // Verificar se email já existe
    const emailExiste = usuarios.find(user => user.email === email);
    if (emailExiste) {
      return res.status(400).json({ 
        error: 'Este email já está cadastrado' 
      });
    }
    
    // Validar senha mínima
    if (senha.length < 6) {
      return res.status(400).json({ 
        error: 'A senha deve ter pelo menos 6 caracteres' 
      });
    }
    
    const novoUsuario = new Usuario(Date.now(), nome, email, senha);
    usuarios.push(novoUsuario);
    
    // Retornar usuário sem a senha
    const { senha: _, ...usuarioResponse } = novoUsuario;
    res.status(201).json(usuarioResponse);
  },

  // API - Obter usuário por ID
  obterUsuario: (req, res) => {
    const { id } = req.params;
    const usuario = usuarios.find(u => u.id == id);
    
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    // Retornar usuário sem a senha
    const { senha: _, ...usuarioResponse } = usuario;
    res.json(usuarioResponse);
  },

  // API - Atualizar usuário
  atualizarUsuario: (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;
    
    const usuarioIndex = usuarios.findIndex(u => u.id == id);
    if (usuarioIndex === -1) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    // Verificar se novo email já existe (exceto o próprio usuário)
    if (email) {
      const emailExiste = usuarios.find(u => u.email === email && u.id != id);
      if (emailExiste) {
        return res.status(400).json({ 
          error: 'Este email já está cadastrado' 
        });
      }
    }
    
    // Atualizar dados
    if (nome) usuarios[usuarioIndex].nome = nome;
    if (email) usuarios[usuarioIndex].email = email;
    
    // Retornar usuário atualizado sem a senha
    const { senha: _, ...usuarioResponse } = usuarios[usuarioIndex];
    res.json(usuarioResponse);
  },

  // API - Excluir usuário
  excluirUsuario: (req, res) => {
    const { id } = req.params;
    const usuarioIndex = usuarios.findIndex(u => u.id == id);
    
    if (usuarioIndex === -1) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    usuarios.splice(usuarioIndex, 1);
    res.json({ message: 'Usuário excluído com sucesso' });
  }
};