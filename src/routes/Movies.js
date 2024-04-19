/**@type{import('fastify').FastifyPluginAsync<>} */

export default async function Movies(app, options) {

    const movies = app.mongo.db.collection('movies');

    app.get('/movies', async (req, rep) => {
        return await movies.find().toArray();
    });

    app.get('/movies/:id', async (req, rep) => {
        let id = req.params.id;
        let movie = await movies.findOne({ _id: new app.mongo.ObjectId(id) });

        return movie;
    });

    app.post('/movies', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    title: { type: 'string' },
                    synopsis: { type: 'string' },
                    img_url: { type: 'string' },
                    release: { type: 'string' },
                    genre_id: { type: 'string' }
                },
                required: ['title', 'synopsis', 'release', 'genre_id']
            }
        },
        config: {
            requireAuthentication: true
        }
    }, async (req, rep) => {
        let movie = req.body;

        await movies.insertOne(movie);

        return rep.code(201).send();
    });

    app.put('/movies/:id', {
        config: {
            requireAuthentication: true
        }
    }, async (req, rep) => {
        let id = req.params.id;
        let movie = req.body;
        await movies.updateOne({ id: new app.mongo.ObjectId(id) }, {
            $set: {
                title: movie.title,
                synopsis: movie.synopsis,
                img_url: movie.img_url,
                release: movie.release,
                genre_id: movie.genre_id
            }
        });

        return rep.code(204).send();
    });

    app.delete('/movies/:id', {
        config: {
            requireAuthentication: true
        }
    }, async (req, rep) => {
        let id = req.params.id;
        await movies.deleteOne({ _id: new app.mongo.ObjectId(id) });

        return rep.code(204).send();
    });
}