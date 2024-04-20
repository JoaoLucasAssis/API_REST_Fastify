import fastify from 'fastify';
import mongodb from '@fastify/mongodb';
import jwt from '@fastify/jwt';
import swagger from '@fastify/swagger';
import swagger_ui from '@fastify/swagger-ui'
import autoload from '@fastify/autoload';

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

export const options = {
    stage: process.env.STAGE,
    port: process.env.PORT,
    host: process.env.HOST,
    logger: process.env.STAGE === 'dev' ? { transport: { target: 'pino-pretty' } } : false,
    jwt_secret: process.env.JWT_SECRET,
    db_url: process.env.DB_URL
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function build(opts) {
    const app = fastify(opts);

    await app.register(jwt, {
        secret: opts.jwt_secret
    });

    await app.register(mongodb, {
        url: opts.db_url
    });

    await app.register(swagger, {
        mode: 'static',
        specification: {
            path: 'src/swagger/aplication.json'
        },
        exposeRoute: true
    })

    await app.register(swagger_ui, {
        routePrefix: '/documentation',
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
        transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
        transformSpecificationClone: true
    })

    await app.register(autoload, {
        dir: path.join(__dirname, 'routes')
    });

    await app.register(autoload, {
        dir: path.join(__dirname, 'hooks'),
        encapsulate: false,
        ignoreFilter: (path) => {
            return path.includes('functions')
        }
    })

    return app;
}