/** @type{import('fastify').FastifyPluginAsync<>} */
import { isAdmin, isAuthenticated } from './functions/index.js'

export default async function onRouteHook(app, options) {
    app.addHook('onRoute', (routeOptions) => {
        console.log('entrou no addHook')
        // Inicialização
        routeOptions.onRequest = Array.isArray(routeOptions.onRequest) ? routeOptions.onRequest : [];

        // onRequest
        if (routeOptions.config?.requireAuthentication) {
            console.log('entrou no requireAuth')
            routeOptions.onRequest.push(isAuthenticated(app));
        }
        if (routeOptions.config?.requireAdmin) {
            routeOptions.onRequest.push(isAdmin(app));
        }
    });
}