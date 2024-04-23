# API RESTful com Fastify e MongoDB

Este projeto é uma API REST feita com Fastify, um servidor web moderno em JavaScript/Node.js.

A API oferece rotas para manipulação de recursos como `movies`, `genres` e `users`, seguindo os princípios RESTful.

Ele implementa autenticação de usuários utilizando JSON Web Tokens (JWT) e separa as preocupações da aplicação durante o lifecycle do Fastify.

### Como funciona

O servidor Fastify é responsável por lidar com as requisições HTTP, roteando-as para as funções correspondentes que realizam as operações no banco de dados MongoDB.

As requisições HTTP são feitas pelo ThunderClient, Postman ou qualquer outro cliente HTTP.

O projeto inclui hooks personalizados criados para fazer verificações durante o ciclo de vida do Fastify.

### Swagger

O projeto implementa os plugins `@fastify/swagger` e `@fastify/swagger-ui` para documentação e testes das rotas da API.

O swagger UI é uma interface de usuário que facilita a visualização e a interação com a documentação da API.

Para acessar o swagger UI, siga estas etapas:

* Abra um navegador da web.

* Navegue até `localhost:3000/documentation`.

> :bulb: obs: A rota localhost:3000/documentation/json para visualizar as especificações das rotas

## Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-202020?style=for-the-badge&logo=fastify&logoColor=white)

## Instalação
<details>
<summary>Clique aqui!</summary>
<p>

### Pré-requisitos para instalação!

![Git](https://img.shields.io/badge/Git-E34F26?style=for-the-badge&logo=git&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
--------------------------------------------------------------------------------------------

Para começar, clone o repositório do projeto em seu ambiente local. Siga a etapa abaixo:

* Abra o terminal na pasta onde deseja clonar o repositório.

* Clone o repositório para o seu ambiente local usando o seguinte comando:

```git
git clone https://github.com/Matheusmslopes/APIRest-Fastify.git
```

> :warning: obs: Certifique-se de ter o git instalado antes de executar o comando no terminal

* Navegue até o diretório do projeto e execute o seguinte comando para instalar todas as dependências:

```git
npm install
```

* Atualize as variáveis de ambiente do arquivo `.env` conforme necessário.
</p>
</details>

## Configuração do MongoDB
<details>
<summary>Clique aqui!</summary>
<p>
O projeto utiliza o MongoDB como banco de dados. Abaixo estão os exemplos das coleções e seus campos:

### Coleção "movies"

```json
{
  "_id": ObjectId("614fdbd0$S31O5$2532b6d36"),
  "title": "Interestelar",
  "synopsis": "É um filme mt bom",
  "img_url": "https://alguma-url.jpeg",
  "release": "06/11/2024",
  "genre_id": "614fdbd0$S31O5$2532b6d37"
}
```

### Coleção "genres"

```json
{
  "_id": ObjectId("614fdbd0$S31O5$2532b6d37"),
  "style": "Ficção científica",
}
```

### Coleção "users"

```json
{
  "_id": ObjectId("614fdbd0$S31O5$2532b6d38"),
  "name": "João",
  "password": "1234",
  "admin": false
}
```
</p>
</details>

## Executando o Projeto

Siga os seguintes  passos para executar o projeto:

* Crie um arquivo `.env` no diretório raiz do projeto baseado no arquivo `.env.sample` já existente.
  
* Altere as configurações do arquivo ***.env*** para utilizar os ambientes desejados.

Para o ambiente de desenvolvimento, foi utilizado a seguinte configuração:

```javascript
STAGE = 'dev'
PORT= '3000'
HOST= '127.0.0.1'
JWT_SECRET= 'Abcd@1234'
DB_URL = 'mongodb://localhost:27017/api-fastify-dev'
```

Para o ambiente de teste, foi utilizado a seguinte configuração:

```javascript
STAGE = 'test'
PORT= '3000'
HOST= '127.0.0.1'
JWT_SECRET= 'Abcd@1234'
DB_URL = 'mongodb://localhost:27017/api-fastify-test'
```

Após a instalação e configuração, você pode executar o projeto usando o seguinte comando:

```node
npm run dev
```

O servidor estará em execução em `http://localhost:3000`.

## Rotas

O projeto fornece as seguintes rotas:

### Movies

* GET `/movies`
* GET `/movies/:id`
* POST `/movies`
* PUT `/movies/:id`
* DELETE `/movies/:id`

### Genres

* GET `/genres`
* GET `/genres/:id/movies`
* POST `/genres`
* PUT `/genres/:id`
* DELETE `/genres/:id`

### Users

* POST `/register`
* PUT `/register/:id`

## Colaboradores

<table>
  <tr>
    <!-- João Lucas -->
    <td align="center">
      <a href="https://github.com/JoaoLucasAssis">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwxCRWlkfeigdbif83ap111RPNlGARl02wOF5OvW9zUA&s" width="100px;" height="100px;" alt="Foto do João Lucas"/><br>
        <sub>
          <b>JoaoLucasAssis</b>
        </sub>
      </a>
    </td>
    </td>
    <!-- Matheus Muruci -->
    <td align="center">
      <a href="https://github.com/Matheusmslopes">
        <img src="https://avatars.githubusercontent.com/u/100313664?v=4" width="100px;" height="100px;" alt="Foto do Matheus Muruci"/><br>
        <sub>
          <b>Matheusmslopes</b>
        </sub>
      </a>
    </td>
    </td>
  </tr>
</table>

## Licença

Este projeto não possui nenhum licença. Sinta-se à vontade para usar, modificar e distribuir este código conforme necessário.