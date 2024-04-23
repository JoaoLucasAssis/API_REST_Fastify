/** @type{import('fastify').FastifyPluginAsync<>} */
import { isAdmin, isAuthenticated, checkGenre, checkMovie, checkAdmin  } from './functions/index.js'

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
        if (routeOptions.url === '/register/:id' && routeOptions.method === '/PUT') {
            routeOptions.preHandler.push(checkAdmin(app));
        }
        if (routeOptions.url === '/genres' && routeOptions.method === 'POST'){
            routeOptions.preHandler.push(checkGenre(app));
        }
        if (routeOptions.url === '/movies' && routeOptions.method === 'POST'){
            routeOptions.preHandler.push(checkMovie(app));
        }
    });
}