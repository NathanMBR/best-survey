import {
  describe,
  it,
  expect,
  vi
} from 'vitest'
import {
  type PrismaClient,
  PrismaPromise
} from '@prisma/client'

import { FindOneUserService } from './FindOneUserService'

vi.useFakeTimers({ toFake: ['Date'] }).setSystemTime(Date.now())

const getSUTEnvironment = () => {
  const prisma = {
    user: {
      findUnique: () => Promise.resolve({
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

  const SUT = new FindOneUserService(prisma)

  return {
    SUT,

    prisma
  }
}

describe('FindOneUserService', () => {
  it('should successfully find an user', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = { id: 'test_id' }
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

  it('should return null if findFirst returns null', async () => {
    const { SUT, prisma } = getSUTEnvironment()

    vi.spyOn(prisma.user, 'findUnique').mockReturnValueOnce(
      Promise.resolve(null) as PrismaPromise<null>
    )

    const SUTRequest = { id: 'test_id' }
    const SUTResponse = await SUT.execute(SUTRequest)

    expect(SUTResponse).toBeNull()
  })

  it('should not search deleted users', async () => {
    const { SUT, prisma } = getSUTEnvironment()

    const findUniqueSpy = vi.spyOn(prisma.user, 'findUnique')

    const SUTRequest = { id: 'test_id' }
    await SUT.execute(SUTRequest)

    const expectedCall = {
      where: {
        id: SUTRequest.id,
        deletedAt: null
      }
    }

    expect(findUniqueSpy).toHaveBeenCalledWith(expectedCall)
  })
})
