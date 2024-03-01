import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRegisterOptions,
  HookHandlerDoneFunction
} from 'fastify'

import { userRoutes } from './userRoutes'

export const fastifyRoutes = (
  app: FastifyInstance,
  _options: FastifyRegisterOptions<FastifyPluginOptions>,
  done: HookHandlerDoneFunction
) => {
  app.register(userRoutes, { prefix: '/users' })

  return done()
}
