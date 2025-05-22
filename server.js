require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');
const path = require('path');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

db.connect()
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');

    // Importar e usar as rotas
    const userRoutes = require('./routes/userRoutes');
    const tarefasRoutes = require('./routes/tarefas');
    const frontendRoutes = require('./routes/frontRoutes');

    app.use('/users', userRoutes);
    app.use('/tarefas', tarefasRoutes);
    app.use('/', frontendRoutes);

    // Redirecionar raiz para tarefas
    app.get('/', (req, res) => {
      res.redirect('/tarefas');
    });

    // Middleware para lidar com erros de rota não encontrada
    app.use((req, res, next) => {
      res.status(404).send('Página não encontrada');
    });

    // Middleware para lidar com erros internos do servidor
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Erro no servidor');
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });