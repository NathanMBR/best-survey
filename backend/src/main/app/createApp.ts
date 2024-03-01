import fastify from 'fastify'
import cors from '@fastify/cors'

import {
  prisma,
  FASTIFY_LOGGER
} from '@/config'
import { fastifyRoutes } from '../routes'

export const createApp = async () => {
  await prisma.$connect()

  const app = fastify({
    logger: FASTIFY_LOGGER
  })

  await app.register(cors)
  app.register(fastifyRoutes, { prefix: '/api' })

  return app
}
