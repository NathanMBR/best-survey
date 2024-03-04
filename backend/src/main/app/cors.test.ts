import {
  describe,
  beforeAll,
  afterAll,
  it,
  expect,
  vi
} from 'vitest'

import type { FastifyInstance } from 'fastify'
import supertest from 'supertest'

import * as config from '@/config'
import { createApp } from './createApp'

vi.spyOn(config.prisma, '$connect').mockImplementation(() => Promise.resolve())
Object.defineProperty(config, 'FASTIFY_LOGGER', { value: false }) // Mock constants

describe('CORS', () => {
  let app: FastifyInstance
  let request: ReturnType<typeof supertest>

  beforeAll(async () => {
    app = await createApp()
    request = supertest(app.server)

    app.get('/test', (_request, response) => response.send())

    await app.listen()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should enable access from any origin', async () => {
    const response = await request.get('/test')
    const corsHeader = response.headers['access-control-allow-origin']

    expect(corsHeader).toBe('*')
  })
})