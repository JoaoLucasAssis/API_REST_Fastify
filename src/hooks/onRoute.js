/** @type{import('fastify').FastifyPluginAsync<>} */

export default async function onRouteHook(app, options) {
    app.addHook('onRoute', (routeOptions) => {
        // Inicialização
        routeOptions.onRequest = Array.isArray(routeOptions.onRequest) ? routeOptions.onRequest : [];
        routeOptions.preHandler = Array.isArray(routeOptions.preHandler) ? routeOptions.preHandler : [];

        // onRequest
        if (routeOptions.config?.requireAuthentication)
            routeOptions.onRequest.push(isAuthenticated(app));
        if (routeOptions.config?.requireAdmin)
            routeOptions.onRequest.push(isAdmin(app));
    });
}