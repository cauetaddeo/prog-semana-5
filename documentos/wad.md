## Modelo de Dados

O modelo lógico do banco de dados está representado no diagrama abaixo:

![Modelo do Banco de Dados](modelo-banco.png)

### Entidades principais:

- **Usuários** (`usuarios`)

  - `id`, `nome`, `email`, `senha`

- **Tarefas** (`tarefas`)

  - `id`, `titulo`, `descricao`, `status`, `data_criacao`, `data_conclusao`, `usuario_id`

- **Categorias** (`categorias`)

  - `id`, `nome`

- **Relação Tarefa-Categoria** (`tarefas_categorias`)
  - `id`, `tarefa_id`, `categoria_id`

O relacionamento entre as tabelas permite que:

- Um usuário tenha várias tarefas;
- Uma tarefa possa pertencer a várias categorias;
- Uma categoria possa agrupar várias tarefas.


## Diagrama de Arquitetura

Diagrama de arquitetura está representado na imagem abaixo:

![alt text](<diagrama de arquitetura.png>)


## Desafios e Explicações 

Durante o desenvolvimento do meu projeto de gerenciador de tarefas, optei por usar a arquitetura MVC, com Node.js e Express.js no backend e HTML, CSS e JavaScript no frontend. A comunicação entre cliente e servidor foi feita usando a fetch API, o que permitiu criar interações dinâmicas. Para armazenar os dados, escolhi o PostgreSQL, pela estabilidade e boa integração com o Node.

Um dos principais aprendizados foi entender como separar corretamente as responsabilidades entre modelos, visualizações e controladores. Isso me ajudou bastante a manter o projeto organizado. Um dos maiores desafios foi lidar com a integração do banco de dados, principalmente ao montar as queries SQL e garantir que tudo funcionasse corretamente com as rotas e os controllers.

Algo que funcionou muito bem foi a estrutura de rotas e a lógica de cadastro e atualização de tarefas. Também consegui montar um backend estável e com boa divisão de arquivos. Por outro lado, ainda quero melhorar a interface do usuário, tornando o design mais atrativo e também aprimorar o tratamento de erros, tanto no backend quanto no frontend, para oferecer uma experiência melhor a quem usar o sistema.