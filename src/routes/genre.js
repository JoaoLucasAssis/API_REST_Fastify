/**@type{import('fastify').FastifyPluginAsync<>} */

export default async function genre(app, options){
    const genres = app.mongo.db.collection('genres');
    const movies = app.mongo.db.collection('movies');

    app.get('/genres', {
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
        },
    }, async(req, rep) => {
        return await genres.find().toArray();
    });

    app.get('/genres/:id', {
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
        },
    }, async(req, rep) => {
        let id = req.params.id;
        let genre = await genre.findOne({_id: new app.mongo.InputId(id)});

        return genre;
    });

    app.get('/genres/:id/movies', {
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
                                description: "Something wrong"
                            }
                    }
                }
            }
        },
    }, async(req, rep) => {
        let id = req.params.id;
        let movie = await movies.find({cat_id: id}).toArray();

        return movie;
    });

    app.post('/genre', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: {type: 'integer'},
                    style: {type: 'string'}
                },
                required: ['style']
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
    }, async(req, rep) => {
        let genre = req.body;

        await genres.insertOne(genre);

        return rep.code(201).send();
    });

    app.put('/genre/:id', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: {type: 'integer'},
                    style: {type: 'string'}
                },
                required: ['style']
            },
            response: {
                204: {
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
    }, async(req, rep) => {
        let id = req.params.id;
        let genre = req.body;

        await genres.updateOne({_id: new app.mongo.InputId(id)}, {
            $set: {
                name: genre.name
            }
        });

        return rep.code(204).send();
    });

    app.delete('/genres/:id', {
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
        let genre = await genres.deleteOne({_id: new app.mongo.InputId(id)});

        return rep.code(204).send();
    });
}