// controllers/TarefaController.js
const pool = require('../config/db');

// Criar uma nova tarefa
exports.criarTarefa = async (req, res) => {
  const { titulo, descricao, usuario_id } = req.body;

  const query = 'INSERT INTO tarefas (titulo, descricao, status, data_criacao, usuario_id) VALUES ($1, $2, $3, CURRENT_DATE, $4) RETURNING *';
  const values = [titulo, descricao, 'pendente', usuario_id];

  try {
    const result = await pool.query(query, values);
    const tarefa = result.rows[0];
    res.status(201).json(tarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as tarefas
exports.listarTarefas = async (req, res) => {
  const query = `
    SELECT t.*, u.nome as usuario_nome 
    FROM tarefas t 
    LEFT JOIN usuarios u ON t.usuario_id = u.id 
    ORDER BY t.data_criacao DESC
  `;

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma tarefa
exports.editarTarefa = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, status } = req.body;

  const query = `
    UPDATE tarefas SET titulo = $1, descricao = $2, status = $3
    WHERE id = $4 RETURNING *`;
  const values = [titulo, descricao, status, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma tarefa
exports.excluirTarefa = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM tarefas WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Renderizar página de tarefas
exports.renderTarefas = async (req, res) => {
  try {
    const tarefasQuery = `
      SELECT t.*, u.nome as usuario_nome 
      FROM tarefas t 
      LEFT JOIN usuarios u ON t.usuario_id = u.id 
      ORDER BY t.data_criacao DESC
    `;
    const usuariosQuery = 'SELECT * FROM usuarios ORDER BY nome';
    const categoriasQuery = 'SELECT * FROM categorias ORDER BY nome';

    const [tarefasResult, usuariosResult, categoriasResult] = await Promise.all([
      pool.query(tarefasQuery),
      pool.query(usuariosQuery),
      pool.query(categoriasQuery)
    ]);

    res.render('tarefas/index', {
      tarefas: tarefasResult.rows,
      usuarios: usuariosResult.rows,
      categorias: categoriasResult.rows,
      pageTitle: 'Gerenciador de Tarefas'
    });
  } catch (err) {
    res.status(500).send('Erro ao carregar página: ' + err.message);
  }
};