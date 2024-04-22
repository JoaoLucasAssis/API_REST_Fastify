/**@type{import('fastify').FastifyPluginAsync<>} */

export default async function user(app, options){
    const users = app.mongo.db.collection('users');

    app.post('/login', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' },
                    password: {type: 'string'}
                },
                required: ['name', 'password']
            }
        }
    },(req, rep) => {
        let user = req.body;
        req.log.info(`Login for user ${user.username}`);
        //check login details
        delete user.password;
        return {
            'admin-token': app.jwt.sign(user)
        }
    });

    app.post('/loginAdmin', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    password: {type: 'string'},
                    isAdmin: {type: 'boolean'}
                },
                required: ['name', 'password', 'isAdmin']
            }
        },
        config: {
            requireAuthentication: true
        }
    }, async (req, rep) => {
        let name = req.body.name;
        let isAdm = req.body.isAdmin;

        let jwtToken = app.jwt.sign(req.body);

        await users.insertOne({name: name, isAdmin: isAdm, jwtToken: jwtToken});

        return rep.code(201).send();
    });
}
