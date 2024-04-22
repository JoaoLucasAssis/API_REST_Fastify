/**@type{import('fastify').FastifyPluginAsync<>} */

export default async function Movies(app, options){

    const movies = app.mongo.db.collection('movies');

    app.get('/movies', {
        schema: {
            response: {
                200: {
                    description: 'Succesful response',
                    type: 'object',
                    properties: {}
                },
                default: {
                    description: 'Internal server response',
                    type: 'object',
                    properties: {
                            statusCode: {
                                type: 'string',
                                description: '500'
                            },
                            message: {
                                type: 'string',
                                description: "Something wrong happened."
                            }
                    }
                }
            }
        }
    }, async (req, rep) => {
        return await movies.find().toArray();
    });

    app.get('/movies/:id', {
        schema: {
            response: {
                200: {
                    description: 'Succesful response',
                    type: 'object',
                    properties: {}
                },
                default: {
                    description: 'Internal server response',
                    type: 'object',
                    properties: {
                            statusCode: {
                                type: 'string',
                                description: '500'
                            },
                            message: {
                                type: 'string',
                                description: "Something wrong happened."
                            }
                    }
                }
            }
        }
    }, async (req, rep) => {
        let id = req.params.id;
        let movie = await movies.findOne({_id: new app.mongo.ObjectId(id)});

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
            },
            response: {
                201: {
                    description: 'Succesful response',
                    type: 'object',
                    properties: {}
                },
                401: {
                    description: 'Unauthorized response',
                    type: 'object',
                    properties: {
                            statusCode: {
                                type: 'string',
                                description: '401'
                            },
                            code: {
                                type: 'string',
                                description: "AUTH_NO_TOKEN"
                            },
                            error: {
                                type: 'string',
                                description: "Unauthorized"
                            },
                            message: {
                                type: 'string',
                                description: "x-access-token is missing"
                            }
                    }
                }
            }
        },
        config: {
            requireAuthentication: true,
            requireAdmin: true
        }
    }, async (req, rep) => {
        let movie = req.body;

        await movies.insertOne(movie);

        return rep.code(201).send();
    });

    app.put('/movies/:id', {
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
            },
            response: {
                204: {
                    description: 'No content response',
                    type: 'object',
                    properties: {}
                },
                401: {
                    description: 'Unauthorized response',
                    type: 'object',
                    properties: {
                            statusCode: {
                                type: 'string',
                                description: '401'
                            },
                            code: {
                                type: 'string',
                                description: "AUTH_NO_TOKEN"
                            },
                            error: {
                                type: 'string',
                                description: "Unauthorized"
                            },
                            message: {
                                type: 'string',
                                description: "x-access-token is missing"
                            }
                    }
                }
            }
        },
        config: {
            requireAuthentication: true,
            requireAdmin: true
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
        schema: {
            response: {
                204: {
                    description: 'No content response',
                    type: 'object',
                    properties: {}
                },
                401: {
                    description: 'Unauthorized response',
                    type: 'object',
                    properties: {
                            statusCode: {
                                type: 'string',
                                description: '401'
                            },
                            code: {
                                type: 'string',
                                description: "AUTH_NO_TOKEN"
                            },
                            error: {
                                type: 'string',
                                description: "Unauthorized"
                            },
                            message: {
                                type: 'string',
                                description: "x-access-token is missing"
                            }
                    }
                }
            }
        },
        config: {
            requireAuthentication: true,
            requireAdmin: true
        }
    }, async (req, rep) => {
        let id = req.params.id;
        await movies.deleteOne({ _id: new app.mongo.ObjectId(id) });

        return rep.code(204).send();
    });
}