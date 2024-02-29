import { z as zod } from 'zod'

/* eslint-disable camelcase */
export const PORT = zod.coerce.number({
  required_error: 'PORT environment variable is required',
  invalid_type_error: 'PORT environment variable must be a number',
  description: 'PORT environment variable'
}).positive().parse(process.env.PORT)

export const FASTIFY_LOGGER = zod.string({
  invalid_type_error: 'FASTIFY_LOGGER environment variable must be a string',
  description: 'FASTIFY_LOGGER environment variable'
}).optional().nullable().transform(value => value === 'true').parse(process.env.FASTIFY_LOGGER)
/* eslint-enable camelcase */
