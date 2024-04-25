/**@type{import('fastify').FastifyPluginAsync<>} */

export default async function genre(app, options){
    const genres = app.mongo.db.collection('genres');
    const movies = app.mongo.db.collection('movies');

    app.get('/genres', async(req, rep) => {
        return await genres.find().toArray();
    });

    app.get('/genres/:id', async(req, rep) => {
        let id = req.params.id;
        let genre = await genres.findOne({_id: new app.mongo.ObjectId(id)});

        return genre;
    });

    app.get('/genres/:id/movies', async(req, rep) => {
        let id = req.params.id;
        let movie = await movies.find({genre_id: id}).toArray();

        return movie;
    });

    app.post('/genres', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: {type: 'integer'},
                    style: {type: 'string'}
                },
                required: ['style']
            }
        },
        config: {
            requireAuthentication: true,
            requireAdmin: true
        }
    }, async(req, rep) => {
        let genre = req.body;

        await genres.insertOne(genre);

        return rep.code(201).send();
    });

    app.put('/genres/:id', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: {type: 'integer'},
                    style: {type: 'string'}
                },
                required: ['style']
            }
        },
        config: {
            requireAuthentication: true,
            requireAdmin: true
        }
    }, async(req, rep) => {
        let id = req.params.id;
        let genre = req.body;

        await genres.updateOne({_id: new app.mongo.ObjectId(id)}, {
            $set: {
                name: genre.name
            }
        });

        return rep.code(204).send();
    });

    app.delete('/genres/:id', {
        config: {
            requireAuthentication: true,
            requireAdmin: true
        }
    }, async (req, rep) => {
        let id = req.params.id;
        await genres.deleteOne({_id: new app.mongo.ObjectId(id)});

        return rep.code(204).send();
    });
}