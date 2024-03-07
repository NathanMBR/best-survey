// @vitest-environment integration

import {
  describe,
  beforeAll,
  afterAll,
  it,
  expect
} from 'vitest'

import type { FastifyInstance } from 'fastify'
import supertest from 'supertest'

import { createApp } from '../app'

describe('POST /api/user', () => {
  let app: FastifyInstance
  let request: ReturnType<typeof supertest>

  beforeAll(async () => {
    app = await createApp()
    request = supertest(app.server)

    await app.listen()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should successfully create an user', async () => {
    const body = {
      name: 'John Doe',
      email: 'john@doe.com',
      password: '12345678'
    }

    const response = await request.post('/api/users').send(body)

    expect(response.status).toBe(201)
    expect(response.body).not.toHaveProperty('internalId')
    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toBeTypeOf('string')
    expect(response.body).toHaveProperty('name', body.name)
    expect(response.body).toHaveProperty('email', body.email)
    expect(response.body).not.toHaveProperty('password')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body.createdAt).toBeTypeOf('string')
    expect(response.body).toHaveProperty('updatedAt')
    expect(response.body.updatedAt).toBeTypeOf('string')
    expect(response.body).not.toHaveProperty('deletedAt')
  })
})
