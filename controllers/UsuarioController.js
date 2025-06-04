const UsuarioService = require('../services/userService');

module.exports = {
  // Renderizar página de usuários
  renderUsuarios: async (req, res) => {
    try {
      const usuarios = await UsuarioService.getAllUsers();
      res.render('usuarios/index', {
        usuarios: usuarios,
        pageTitle: 'Gerenciar Usuários'
      });
    } catch (error) {
      console.error('Erro ao renderizar usuários:', error);
      res.status(500).send('Erro ao carregar página de usuários: ' + error.message);
    }
  },

  // API - Listar usuários (JSON)
  listarUsuarios: async (req, res) => {
    try {
      const usuarios = await UsuarioService.getAllUsers();
      res.json(usuarios);
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // API - Criar usuário
  criarUsuario: async (req, res) => {
    try {
      const { nome, email, senha } = req.body;
      
      // Validações básicas
      if (!nome || !email || !senha) {
        return res.status(400).json({ 
          error: 'Nome, email e senha são obrigatórios' 
        });
      }
      
      // Validar formato do email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          error: 'Formato de email inválido' 
        });
      }
      
      // Validar senha mínima
      if (senha.length < 6) {
        return res.status(400).json({ 
          error: 'A senha deve ter pelo menos 6 caracteres' 
        });
      }
      
      const novoUsuario = await UsuarioService.createUser(nome, email, senha);
      
      // Retornar sucesso com dados do usuário
      res.status(201).json({
        success: true,
        message: 'Usuário cadastrado com sucesso!',
        usuario: novoUsuario,
        redirectUrl: '/tarefas'
      });
      
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(400).json({ 
        error: error.message || 'Erro interno do servidor' 
      });
    }
  },

  // API - Obter usuário por ID
  obterUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await UsuarioService.getUserById(id);
      
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      
      res.json(usuario);
    } catch (error) {
      console.error('Erro ao obter usuário:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // API - Atualizar usuário
  atualizarUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, email } = req.body;
      
      // Verificar se o usuário existe
      const usuarioExistente = await UsuarioService.getUserById(id);
      if (!usuarioExistente) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      
      // Validar formato do email se fornecido
      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({ 
            error: 'Formato de email inválido' 
          });
        }
      }
      
      const usuarioAtualizado = await UsuarioService.updateUser(id, nome, email);
      res.json({
        success: true,
        message: 'Usuário atualizado com sucesso!',
        usuario: usuarioAtualizado
      });
      
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(400).json({ error: error.message });
    }
  },

  // API - Excluir usuário
  excluirUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Verificar se o usuário existe
      const usuarioExistente = await UsuarioService.getUserById(id);
      if (!usuarioExistente) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      
      await UsuarioService.deleteUser(id);
      res.json({ 
        success: true,
        message: 'Usuário excluído com sucesso' 
      });
      
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      res.status(500).json({ error: error.message });
    }
  }
};