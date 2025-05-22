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


npm install

node server.js

http://localhost:3000
