require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // CORRIGIR PASTA

// Importar rotas
const userRoutes = require('./routes/userRoutes');
const tarefasRoutes = require('./routes/tarefas');
const usuarioRoutes = require('./routes/usuarioRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');

// Usar rotas
app.use('/api/users', userRoutes);
app.use('/tarefas', tarefasRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/categorias', categoriaRoutes);

// Rota principal
app.get('/', (req, res) => {
  res.redirect('/tarefas');
});

// Rota para dashboard
app.get('/dashboard', async (req, res) => {
  try {
    res.render('pages/dashboard', {
      pageTitle: 'Dashboard - Gerenciador de Tarefas'
    });
  } catch (err) {
    res.status(500).send('Erro ao carregar dashboard: ' + err.message);
  }
});

// Rota para página de usuários
app.get('/usuarios', async (req, res) => {
  try {
    res.render('usuarios/index', {
      pageTitle: 'Gerenciar Usuários - TaskManager'
    });
  } catch (err) {
    res.status(500).send('Erro ao carregar página de usuários: ' + err.message);
  }
});

// Rota para página de categorias
app.get('/categorias', async (req, res) => {
  try {
    res.render('categorias/index', {
      pageTitle: 'Gerenciar Categorias - TaskManager'
    });
  } catch (err) {
    res.status(500).send('Erro ao carregar página de categorias: ' + err.message);
  }
});

// Middleware de erro 404
app.use((req, res, next) => {
  res.status(404).render('pages/404', {
    pageTitle: 'Página não encontrada'
  });
});

// Middleware de erro 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('pages/error', {
    pageTitle: 'Erro do servidor',
    error: err.message
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});