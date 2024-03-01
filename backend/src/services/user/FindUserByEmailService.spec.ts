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

import { FindUserByEmailService } from './FindUserByEmailService'

vi.useFakeTimers({ toFake: ['Date'] }).setSystemTime(Date.now())

const getSUTEnvironment = () => {
  const prisma = {
    user: {
      findFirst: () => Promise.resolve({
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
  } as PrismaClient

  const SUT = new FindUserByEmailService(prisma)

  return {
    SUT,

    prisma
  }
}

describe('FindUserByEmailService', () => {
  it('should successfully find an user by email', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = { email: 'john@doe.com' }
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

    vi.spyOn(prisma.user, 'findFirst').mockReturnValueOnce(
      Promise.resolve(null) as PrismaPromise<null>
    )

    const SUTRequest = { email: 'john@doe.com' }
    const SUTResponse = await SUT.execute(SUTRequest)

    expect(SUTResponse).toBeNull()
  })

  it('should not search deleted users', async () => {
    const { SUT, prisma } = getSUTEnvironment()

    const findFirstSpy = vi.spyOn(prisma.user, 'findFirst')

    const SUTRequest = { email: 'john@doe.com' }
    await SUT.execute(SUTRequest)

    const expectedCall = {
      where: {
        email: SUTRequest.email,
        deletedAt: null
      }
    }

    expect(findFirstSpy).toHaveBeenCalledWith(expectedCall)
  })
})
