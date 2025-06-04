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

// Novo endpoint para retornar as tarefas (dados para o dashboard)
app.get('/tarefas/api', async (req, res) => {
  try {
    // Aqui você pode buscar as tarefas do banco de dados ou de outro serviço
    // Exemplo de dados fictícios:
    const tasks = [
      { titulo: "Task 1", status: "pendente", usuario_nome: "Alice" },
      { titulo: "Task 2", status: "em-andamento", usuario_nome: "Bob" },
      { titulo: "Task 3", status: "concluida", usuario_nome: "Charlie" }
    ];
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

// Middleware de erro 404 - Diferencia resposta entre API e HTML
app.use((req, res, next) => {
  res.status(404);
  if (req.originalUrl.startsWith('/api/')) {
    return res.json({ error: 'Endpoint não encontrado' });
  }
  res.render('pages/404', {
    pageTitle: 'Página não encontrada'
  });
});

// Middleware de erro 500 - Diferencia resposta entre API e HTML
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500);
  if (req.originalUrl.startsWith('/api/')) {
    return res.json({ error: err.message });
  }
  res.render('pages/error', {
    pageTitle: 'Erro do servidor',
    error: err.message
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

require('child_process').exec(`start http://localhost:${PORT}/usuarios`)







