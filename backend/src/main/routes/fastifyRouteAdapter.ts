import {
  FastifyRequest,
  FastifyReply
} from 'fastify'

import { Http } from '@/controllers'

export const fastifyRouteAdapter = (controller: Http.Controller) => {
  const fastifyRoute = async (request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> => {
    const httpResponse = await controller.handle(request)

    return response
      .status(httpResponse.status)
      .send(httpResponse.body)
  }

  return fastifyRoute
}
