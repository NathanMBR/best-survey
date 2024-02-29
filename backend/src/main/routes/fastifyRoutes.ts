import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRegisterOptions,
  HookHandlerDoneFunction
} from 'fastify'

import { userRoutes } from './userRoutes'

export const fastifyRoutes = async (
  app: FastifyInstance,
  _options: FastifyRegisterOptions<FastifyPluginOptions>,
  done: HookHandlerDoneFunction
) => {
  await app.register(userRoutes, { prefix: '/users' })

  return done()
}
