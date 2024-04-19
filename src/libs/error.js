import createError from '@fastify/error'

export const AUTH_NO_TOKEN = createError('AUTH_NO_TOKEN', 'x-access-token is missing', 401)
export const AUTH_INVALID_TOKEN = createError('AUTH_INVALID_TOKEN', 'The token provided is invalid', 401)

export const AUTH_NO_ADMIN_TOKEN = createError('AUTH_NO_ADMIN_TOKEN', 'admin-token is missing', 401)
export const AUTH_INVALID_ADMIN_TOKEN = createError('AUTH_INVALID_ADMIN_TOKEN', 'The admin-token provided is invalid', 401)