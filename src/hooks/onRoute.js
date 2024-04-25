/** @type{import('fastify').FastifyPluginAsync<>} */
import { isAdmin, isAuthenticated, GenreExists, MovieExists, UserExists, AdminExists } from './functions/index.js'

export default async function onRouteHook(app, options) {
    app.addHook('onRoute', (routeOptions) => {
        // Inicialização
        routeOptions.onRequest = Array.isArray(routeOptions.onRequest) ? routeOptions.onRequest : [];
        routeOptions.preHandler = Array.isArray(routeOptions.preHandler) ? routeOptions.preHandler : [];

        // onRequest
        if (routeOptions.config?.requireAuthentication) {
            routeOptions.onRequest.push(isAuthenticated(app));
        }
        if (routeOptions.config?.requireAdmin) {
            routeOptions.onRequest.push(isAdmin(app));
        }

        // PreHandler
        if (routeOptions.url === '/register' && routeOptions.method === 'POST') {
            routeOptions.preHandler.push(UserExists(app));
        }
        if (routeOptions.url === '/register/:id' && routeOptions.method === 'PUT') {
            routeOptions.preHandler.push(AdminExists(app));
        }
        if (routeOptions.url === '/genres' && routeOptions.method === 'POST') {
            routeOptions.preHandler.push(GenreExists(app));
        }
        if (routeOptions.url === '/movies' && routeOptions.method === 'POST') {
            routeOptions.preHandler.push(MovieExists(app));
        }
    });
}