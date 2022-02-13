# Store Manager Project

# Contexto
Este projeto consiste no desenvolvimendo de uma API RESTful utilizando a arquitetura MSC. A API a ser construída trata-se de um sistema de gerenciamento de vendas, onde será possível criar, visualizar, deletar e atualizar produtos e vendas (`CRUD`, para os mais íntimos 😜).

Desenvolvi as camadas de: Models, Services e Controllers.

O banco utilizado em questão para gestão de dados foi o MySQL e para testar as requisições utilizei o Postman.

## Tecnologias usadas

Back-End:
> Desenvolvido usando: Node.js, Express, MySQL

Testes:
> Desenvolvido usando: Mocha, Chai, Sinon

Requisições:
> Realizadas usando: Postman

# Habilidades treinadas

- Desenvolvimento da camada de Model;
- Conectar a aplicação com um banco de dados;
- Estruturar a aplicação em camadas;
- Delegar responsabilidades específicas para cada parte do app;
- Melhorar manutenção e usabilidade do seu código;
- Desenvolver uma API segundo os padrões REST;
- Desenvolvimento de assinaturas para APIs intuitivas e facilmente entendíveis.

## Clonando o repositório:

1. Clone o repositório
  * `git clone https://github.com/juan-formoso/store-manager-project.git`.
  * Entre na pasta do repositório clonado:
    * `cd store-manager-project`

2. Instale as dependências e restaure o arquivo `talkers.json`
  * `npm install`

3. Crie uma branch a partir da branch `main`
  * `git checkout -b my-new-branch`

4. Se divirta para fazer o que quiser :)

### Rodando a aplicação
- Utilize o comando `npm start` e verifique a porta em que a aplicação está rodando.

- Utilize um client para fazer as requisições HTTP.
DICA: *Recomendo Postman, Insomnia ou a extensão Thunder Client do VS Code ;)*

### Rodando os testes (desenvolvidos por mim)

- Execute o comando `npm run test:mocha`

### Rodando os testes (desenvolvidos pela Trybe)

- Execute o comando `npm test`

### Conexão com o Banco:

**⚠️ IMPORTANTE! ⚠️**

Crie um arquivo chamado "`.env`" com as variáveis de ambiente. Por exemplo, caso o seu usuário SQL seja `nome` e a senha `1234` seu arquivo ficará desta forma:

```sh
MYSQL_HOST=localhost
MYSQL_USER=nome
MYSQL_PASSWORD=1234
PORT=3000
```

**Nota**: A variável **PORT** do arquivo `.env` deve ser utilizada para a conexão com o servidor. É importante utilizar essa variável para os testes serem executados corretamente.
