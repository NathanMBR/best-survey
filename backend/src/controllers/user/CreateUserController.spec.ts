import {
  describe,
  it,
  expect,
  vi
} from 'vitest'

import {
  IFindUserByEmailService,
  IHashStringService,
  ICreateUserService
} from '@/services'
import { ICreateUserValidator } from '@/validators'

import { CreateUserController } from './CreateUserController'

vi.useFakeTimers({ toFake: ['Date'] }).setSystemTime(Date.now())

const getSUTEnvironment = () => {
  class CreateUserValidatorStub implements ICreateUserValidator {
    execute(): ICreateUserValidator.Response {
      return {
        status: 'SUCCESS' as const,
        data: {
          name: 'John Doe',
          email: 'john@doe.com',
          password: '12345678'
        }
      }
    }
  }

  class FindUserByEmailServiceStub implements IFindUserByEmailService {
    async execute(): IFindUserByEmailService.Response {
      return null
    }
  }

  class HashStringServiceStub implements IHashStringService {
    async execute(): IHashStringService.Response {
      return 'hashed_password'
    }
  }

  class CreateUserServiceStub implements ICreateUserService {
    async execute(): ICreateUserService.Response {
      return {
        internalId: 1,
        id: 'test_id',
        name: 'John Doe',
        email: 'john@doe.com',
        password: 'hashed_password',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
    }
  }

  const createUserValidatorStub = new CreateUserValidatorStub()
  const findUserByEmailServiceStub = new FindUserByEmailServiceStub()
  const hashStringServiceStub = new HashStringServiceStub()
  const createUserServiceStub = new CreateUserServiceStub()

  const SUT = new CreateUserController(
    createUserValidatorStub,
    findUserByEmailServiceStub,
    hashStringServiceStub,
    createUserServiceStub
  )

  return {
    SUT,

    createUserValidatorStub,
    findUserByEmailServiceStub,
    hashStringServiceStub,
    createUserServiceStub
  }
}

describe('CreateUserController', () => {
  it('should successfully create an user', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {} // data doesn't matter since validator is stubbed

    const SUTResponse = await SUT.handle(SUTRequest)

    const expectedResponse = {
      status: 201,
      body: {
        id: 'test_id',
        name: 'John Doe',
        email: 'john@doe.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return error if createUserValidator returns error', async () => {
    const { SUT, createUserValidatorStub } = getSUTEnvironment()

    vi.spyOn(createUserValidatorStub, 'execute').mockReturnValueOnce({
      status: 'ERROR',
      error: 'Invalid payload'
    })

    const SUTRequest = {}

    const SUTResponse = await SUT.handle(SUTRequest)

    const expectedResponse = {
      status: 400,
      body: {
        message: 'Invalid payload',
        code: 'INVALID_PAYLOAD'
      }
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return error if findUserByEmailService returns user', async () => {
    const { SUT, findUserByEmailServiceStub } = getSUTEnvironment()

    vi.spyOn(findUserByEmailServiceStub, 'execute').mockReturnValueOnce(
      Promise.resolve({
        internalId: 1,
        id: 'test_id',
        name: 'John Doe',
        email: 'john@doe.com',
        password: 'hashed_password',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      })
    )

    const SUTRequest = {}

    const SUTResponse = await SUT.handle(SUTRequest)

    const expectedResponse = {
      status: 400,
      body: {
        message: 'Email already used',
        code: 'EMAIL_ALREADY_USED'
      }
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should use hashed password instead of original', async () => {
    const { SUT, createUserServiceStub } = getSUTEnvironment()

    const createUserServiceSpy = vi.spyOn(createUserServiceStub, 'execute')

    const SUTRequest = {}

    await SUT.handle(SUTRequest)

    const expectedCall = {
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'hashed_password'
    }

    expect(createUserServiceSpy).toHaveBeenCalledWith(expectedCall)
  })

  it('should remove internalId, deletedAt and password from response', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {}

    const SUTResponse = await SUT.handle(SUTRequest)

    expect(SUTResponse.body).toHaveProperty('id')
    expect(SUTResponse.body).toHaveProperty('name')
    expect(SUTResponse.body).toHaveProperty('email')
    expect(SUTResponse.body).toHaveProperty('createdAt')
    expect(SUTResponse.body).toHaveProperty('updatedAt')
    expect(SUTResponse.body).not.toHaveProperty('internalId')
    expect(SUTResponse.body).not.toHaveProperty('deletedAt')
    expect(SUTResponse.body).not.toHaveProperty('password')
  })
})
