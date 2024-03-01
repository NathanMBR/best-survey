import {
  FastifyInstance,
  FastifyRegisterOptions,
  FastifyPluginOptions,
  HookHandlerDoneFunction
} from 'fastify'

import { makeCreateUserController } from '../factories'
import { fastifyRouteAdapter } from './fastifyRouteAdapter'

export const userRoutes = (
  app: FastifyInstance,
  _options: FastifyRegisterOptions<FastifyPluginOptions>,
  done: HookHandlerDoneFunction
) => {
  const createUserController = makeCreateUserController()

  const createUserRoute = fastifyRouteAdapter(createUserController)

  app.post('/', createUserRoute)

  return done()
}
