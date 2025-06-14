# Descrição do sistema escolhido

Este projeto é um sistema de gerenciamento de tarefas desenvolvido como parte do Projeto Individual (COMP Parte 1). Ele é um exemplo que serve para que usuários cadastrem tarefas, associem a categorias e visualizem os dados através de uma API estruturada em Node.js com o framework Express, utilizando o padrão de projeto MVC (Model-View-Controller).

## Estrutura de pastas e arquivos

O projeto está organizado da seguinte forma:
```
mvc-boilerplate/
├── assets/ # Arquivos públicos como imagens e fontes
├── config/ # Arquivos de configuração
├── controllers/ # Controladores das requisições
├── docs/ # Documentação do projeto
│ └── modelo-banco.png # Modelo relacional do banco de dados
├── models/ # Modelos de dados
├── routes/ # Definição das rotas
├── scripts/ # Scripts JavaScript públicos
├── services/ # Serviços auxiliares
├── styles/ # Estilos CSS
├── tests/ # Testes automatizados
├── views/ # Templates de interface (EJS)
├── .env.example # Exemplo de variáveis de ambiente
├── .gitignore
├── jest.config.js
├── package.json
├── package-lock.json
├── server.js # Arquivo principal do servidor
└── wad.md
```


## Como executar o projeto localmente

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
```


# Gerenciador de Tarefas - Projeto MVC
## Descrição
API RESTful desenvolvida em Node.js utilizando o padrão de arquitetura MVC e banco de dados PostgreSQL, para gerenciar usuários, tarefas e categorias.

Tecnologias
Node.js

Express.js

PostgreSQL

pg (biblioteca de conexão)

Dotenv

Requisitos
PostgreSQL instalado

Node.js instalado

Criando o Banco
Acesse seu PostgreSQL:

```
Copiar
Editar
CREATE DATABASE tarefas_db;
Configure o arquivo .env na raiz do projeto:

ini
Copiar
Editar
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=tarefas_db
Rodando as Migrações
````
Criação das Tabelas
Execute este script no seu PostgreSQL:

```
Copiar
Editar
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE tarefas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    status VARCHAR(20) DEFAULT 'pendente',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_conclusao TIMESTAMP,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE tarefas_categorias (
    id SERIAL PRIMARY KEY,
    tarefa_id INTEGER REFERENCES tarefas(id) ON DELETE CASCADE,
    categoria_id INTEGER REFERENCES categorias(id) ON DELETE CASCADE
);
```
Como Rodar o Projeto
Instale as dependências:

bash
Copiar
Editar
npm install
Configure o arquivo .env conforme o exemplo acima.

Inicie o servidor:

bash
Copiar
Editar
node index.js

Documentação da API
Endpoints
Método	Rota	Descrição
GET	/usuarios	Lista todos os usuários
POST	/usuarios	Cria um novo usuário
GET	/tarefas	Lista todas as tarefas
POST	/tarefas	Cria uma nova tarefa
PUT	/tarefas/:id	Atualiza uma tarefa
DELETE	/tarefas/:id	Deleta uma tarefa
GET	/categorias	Lista todas as categorias
POST	/categorias	Cria uma nova categoria
POST	/tarefas/:id/categorias	Relaciona uma categoria a uma tarefa

Exemplos de Requisições
Criar Usuário (POST /usuarios):

```
Copiar
Editar
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456"
}
Criar Tarefa (POST /tarefas):

json
Copiar
Editar
{
  "titulo": "Estudar Node.js",
  "descricao": "Fazer exercícios de Express e PostgreSQL",
  "status": "pendente",
  "usuario_id": 1
}
Criar Categoria (POST /categorias):

json
Copiar
Editar
{
  "nome": "Estudos"
}
Vincular Categoria a uma Tarefa (POST /tarefas/:id/categorias):

json
Copiar
Editar
{
  "categoria_id": 1
}
````
npm install

node server.js

http://localhost:3000


### Link Vídeo da etrega da ponderada semana 8

https://youtu.be/62_LEAFiisk
