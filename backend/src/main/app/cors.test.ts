// @vitest-environment integration

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

import { prisma } from '@/config'
import { createApp } from './createApp'

vi.spyOn(prisma, '$connect').mockImplementation(() => Promise.resolve()) // CORS test doesn't require database connection

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
