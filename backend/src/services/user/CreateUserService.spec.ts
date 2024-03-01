import {
  describe,
  it,
  expect,
  vi
} from 'vitest'
import type { PrismaClient } from '@prisma/client'

import { CreateUserService } from './CreateUserService'

vi.useFakeTimers({ toFake: ['Date'] }).setSystemTime(Date.now())

const getSUTEnvironment = () => {
  const prisma = {
    user: {
      create: () => Promise.resolve({
        internalId: 1,
        id: 'test_id',
        name: 'John Doe',
        email: 'john@doe.com',
        password: 'hashed_password',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      })
    }
  } as unknown as PrismaClient

  const SUT = new CreateUserService(prisma)

  return {
    SUT,

    prisma
  }
}

describe('CreateUserService', () => {
  it('should successfully create an user', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'hashed_password'
    }

    const SUTResponse = await SUT.execute(SUTRequest)

    const expectedResponse = {
      internalId: 1,
      id: 'test_id',
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'hashed_password',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })
})
