import { test, describe } from 'node:test';
import { equal, deepEqual } from 'node:assert';
import { build, options } from './app.js';
import { request } from 'node:http';

/*
SCRIPT PARA TESTE DAS ROTAS DA API

Um banco de dados de teste foi criado para que a manipulação das rotas não afete o banco de dados da aplicação
--> mongodb://localhost:27017/APIFastify-test

Para funcionamento das rotas de GET /*, foi criado previamente um item para cada coleção abaixo:

Coleção de `genres`:
{
  "_id": {
    "$oid": "661d9cf8ad84d4573574d57c"
  },
  "style": "TestGenre"
}

Coleção de `movies`:
{
  "_id": {
    "$oid": "66215a14683ecf32e0dd6ebf"
  },
  "title": "TestMovie",
  "synopsis": "This is a test synopsis, nothing here matters.",
  "img_url": "https://some-img-url-test-example.jpg",
  "release": "xx-xx-xxxx",
  "genre_id": "661d9cf8ad84d4573574d57c"
}

Coleção de `users`:
{
  "_id": {
    "$oid": "66215a14683ecf32e0dd6bfe"
  },
  "name": "TestUser",
  "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWF0aGV1cyIsInBhc3N3b3JkIjoic2xhIiwiaWF0IjoxNzEzODIxOTQ3fQ.tc4aQYyufI3XnxwpWbJmrwC0d60LoLi0TWDG-Ee4L7Y"
}

Para executar o script de teste, basta digitar o seguinte comando no terminal:
--> npm run test

Para rodar o script mais de uma vez, é necessário realizar as seguintes ações:
--> Criação dos itens de cada coleção novamente
--> Remoção dos itens criados pelo teste ou alteração dos valores das variáveis utilizadas
*/

const jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWF0aGV1cyIsInBhc3N3b3JkIjoic2xhIiwiaWF0IjoxNzEzODIxOTQ3fQ.tc4aQYyufI3XnxwpWbJmrwC0d60LoLi0TWDG-Ee4L7Y"
const admin_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWF0aGV1cyIsInBhc3N3b3JkIjoic2xhIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzEzODIyMTc1fQ.E6Y1w6OES5XUQsj-6AS6lxy3vMyeOD2zO8uM29oFCVQ"

const CreateUser = {
    "name": "name",
    "password": "psswd"
};
const UpdateUser = {
    "name": "username",
    "password": "psswd",
    "isAdmin": true
};
const InvalidUser = {
    "name": "username",
    "password": "psswd",
    "isAdmin": false
};

const CreateGenre = {
    "style": "TestStyle"
};
const UpdateGenre = {
    "style": "This ia s tested style"
};

const CreateMovie = {
    "title": "TestMovie2",
    "synopsis": "This is a test synopsis, nothing matters.",
    "img_url": "https://some-img-url-test-example.jpg",
    "release": "xx-xx-xxxx",
    "genre_id": "661d9cf8ad84d4573574d57c"
};
const UpdateMovie = {
    "title": "TestMovie2",
    "synopsis": "This is a test synopsis updated, nothing matters again.",
    "img_url": "https://some-img-url-test-example-updated.jpg",
    "release": "xx-xx-xxxx",
    "genre_id": "661d9cf8ad84d4573574d57c"
};

describe('### Tests for server config', async (t) => {
    test('Testing options configuration file', async (t) => {

        const app = await build(options);

        t.after(async () => {
            await app.close();
        });

        deepEqual(options.stage, 'test');
        deepEqual(options.port, '3000');
        deepEqual(options.host, '127.0.0.1');
        deepEqual(options.jwt_secret, 'Abcd@1234');
        deepEqual(options.db_url, 'mongodb://localhost:27017/api-fastify-test');
    });
});

describe('### Tests for unauthenticated routes', async (t) => {

    describe('## Success Request', async (t) => {

        test('# GET /movies', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });

            const response = await app.inject({
                method: 'GET',
                url: '/movies'
            });

            equal(response.statusCode, 200);
        });

        test('# GET /movies/:id', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });

            const response = await app.inject({
                method: 'GET',
                url: '/movies/66215a14683ecf32e0dd6ebf'
            })

            equal(response.statusCode, 200)
        });

        test('# GET /genres', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });

            const response = await app.inject({
                method: 'GET',
                url: '/genres'
            });

            equal(response.statusCode, 200);
        });

        test('# GET /genres/:id', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });

            const response = await app.inject({
                method: 'GET',
                url: '/genres/661d9cf8ad84d4573574d57c'
            })

            equal(response.statusCode, 200)
        });

        test('# GET /genres/:id/movies', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });

            const response = await app.inject({
                method: 'GET',
                url: '/genres/661d9cf8ad84d4573574d57c/movies'
            });
            
            equal(response.statusCode, 200);
        });

        test('# POST /register', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });
            
            const response = await app.inject({
                method: 'POST',
                url: '/register',
                body: CreateUser
            });
            
            equal(response.statusCode, 201);
        });
    });
});

describe('### Tests for authenticated routes', async (t) => {

    describe('## Success Request', async (t) => {

        test('# POST /genres', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });
            
            const response = await app.inject({
                method: 'POST',
                url: '/genres',
                body: CreateGenre,
                headers: {
                    'x-access-token': jwt_token,
                    'admin-token': admin_token
                }
            });
            
            equal(response.statusCode, 201);
        });

        test('# PUT /genres/:id', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });

            const response = await app.inject({
                method: 'PUT',
                url: '/genres/661d9cf8ad84d4573574d57c',
                body: UpdateGenre,
                headers: {
                    'x-access-token': jwt_token,
                    'admin-token': admin_token
                }
            });
            
            equal(response.statusCode, 204);
        });

        test('# DELETE /genres/:id', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });
            
            const response = await app.inject({
                method: 'DELETE',
                url: '/genres/661d9cf8ad84d4573574d57c',
                headers: {
                    'x-access-token': jwt_token,
                    'admin-token': admin_token
                }
            });
            
            equal(response.statusCode, 204);
        });

        test('# POST /movies', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });
            
            const response = await app.inject({
                method: 'POST',
                url: '/movies',
                body: CreateMovie,
                headers: {
                    'x-access-token': jwt_token,
                    'admin-token': admin_token
                }
            });
            
            equal(response.statusCode, 201);
        });

        test('# PUT /movies/:id', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });
            
            const response = await app.inject({
                method: 'PUT',
                url: '/movies/66215a14683ecf32e0dd6ebf',
                body: UpdateMovie,
                headers: {
                    'x-access-token': jwt_token,
                    'admin-token': admin_token
                }
            });
            
            equal(response.statusCode, 204);
        });

        test('# DELETE /movies/:id', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });

            const response = await app.inject({
                method: 'DELETE',
                url: '/movies/66215a14683ecf32e0dd6ebf',
                headers: {
                    'x-access-token': jwt_token,
                    'admin-token': admin_token
                }
            });
            
            equal(response.statusCode, 204);
        });

        test('# PUT /register/:id', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });

            const response = await app.inject({
                method: 'PUT',
                url: '/register/66215a14683ecf32e0dd6bfe',
                body: UpdateUser,
                headers: {
                    'x-access-token': jwt_token
                }
            });
            
            equal(response.statusCode, 200);
        });
    });

    describe('## Bad Request', async (t) => {

        test('# No x-access-token - POST /movies', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });
            
            const response = await app.inject({
                method: 'POST',
                url: '/movies',
                body: CreateMovie,
                headers: {
                    'x-access-token': "",
                    'admin-token': admin_token
                }
            });
            
            equal(response.statusCode, 401);
        });

        test('# No admin-token - POST /movies', async(t) => {
            const app = await build(options);

            t.after(async() => {
            await app.close();
            });

            const response = await app.inject({
                method: 'POST',
                url: '/movies',
                body: CreateMovie,
                headers: {
                    'x-access-token': jwt_token,
                    'admin-token': ""
                }
            });
            equal(response.statusCode, 401);
        });

        test('# Invalid x-access-token - POST /movies', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });

            let invalid_jwt_token = jwt_token.replace("e", "");
            
            const response = await app.inject({
                method: 'POST',
                url: '/movies',
                body: CreateMovie,
                headers: {
                    'x-access-token': invalid_jwt_token,
                    'admin-token': admin_token
                }
            });
            
            equal(response.statusCode, 401);
        });

        test('# Invalid admin-token - POST /movies', async(t) => {
            const app = await build(options);

            t.after(async() => {
            await app.close();
            });

            let invalid_admin_token = admin_token.replace("e", "");

            const response = await app.inject({
                method: 'POST',
                url: '/movies',
                body: CreateMovie,
                headers: {
                    'x-access-token': jwt_token,
                    'admin-token': invalid_admin_token
                }
            });
            equal(response.statusCode, 401);
        });

        test('# Admin property - PUT /register/:id', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });
            
            const response = await app.inject({
                method: 'PUT',
                url: '/register/66215a14683ecf32e0dd6bfe',
                body: InvalidUser,
                headers: {
                    'x-access-token': jwt_token
                }
            });
            equal(response.statusCode, 400);
        });

        test('# Already exists - POST /movies', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });
            
            const response = await app.inject({
                method: 'POST',
                url: '/movies',
                body: CreateMovie,
                headers: {
                    'x-access-token': jwt_token,
                    'admin-token': admin_token
                }
            });
            
            equal(response.statusCode, 412);
        });

        test('# Already exists - POST /genres', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });
            
            const response = await app.inject({
                method: 'POST',
                url: '/genres',
                body: CreateGenre,
                headers: {
                    'x-access-token': jwt_token,
                    'admin-token': admin_token
                }
            });
            
            equal(response.statusCode, 412);
        });
    });
});