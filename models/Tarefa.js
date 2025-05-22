class Tarefa {
  constructor(id, titulo, descricao, status, dataCriacao, dataConclusao, usuarioId) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.status = status;
    this.dataCriacao = dataCriacao;
    this.dataConclusao = dataConclusao;
    this.usuarioId = usuarioId;
  }
}

module.exports = Tarefa;
