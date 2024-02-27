import {
  describe,
  it,
  expect
} from 'vitest'

import { CreateUserValidator } from './CreateUserValidator'

const getSUTEnvironment = () => {
  const SUT = new CreateUserValidator()

  return {
    SUT
  }
}

describe('CreateUserValidator', () => {
  it('should successfully validate a create user payload', () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      name: 'John Doe',
      email: 'john@doe.com',
      password: '12345678'
    }

    const SUTResponse = SUT.execute(SUTRequest)

    const expectedResponse = {
      status: 'SUCCESS',
      data: {
        name: 'John Doe',
        email: 'john@doe.com',
        password: '12345678'
      }
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return error when name is undefined', () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      // name: 'John Doe',
      email: 'john@doe.com',
      password: '12345678'
    }

    const SUTResponse = SUT.execute(SUTRequest)

    const expectedResponse = {
      status: 'ERROR',
      error: 'User name is required'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return error when name is not a string', () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      name: 123,
      email: 'john@doe.com',
      password: '12345678'
    }

    const SUTResponse = SUT.execute(SUTRequest)

    const expectedResponse = {
      status: 'ERROR',
      error: 'User name must be a string'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return error when name has less than 3 characters', () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      name: 'JD',
      email: 'john@doe.com',
      password: '12345678'
    }

    const SUTResponse = SUT.execute(SUTRequest)

    const expectedResponse = {
      status: 'ERROR',
      error: 'User name must be at least 3 characters long'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return error when name has more than 255 characters', () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      name: new Array(50).fill('John').join('Doe'),
      email: 'john@doe.com',
      password: '12345678'
    }

    const SUTResponse = SUT.execute(SUTRequest)

    const expectedResponse = {
      status: 'ERROR',
      error: 'User name must be at most 255 characters long'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return error when email is undefined', () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      name: 'John Doe',
      // email: 'john@doe.com',
      password: '12345678'
    }

    const SUTResponse = SUT.execute(SUTRequest)

    const expectedResponse = {
      status: 'ERROR',
      error: 'User email is required'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return error when email is not a string', () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      name: 'John Doe',
      email: 123,
      password: '12345678'
    }

    const SUTResponse = SUT.execute(SUTRequest)

    const expectedResponse = {
      status: 'ERROR',
      error: 'User email must be a string'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return error when email is not in a valid format', () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      name: 'John Doe',
      email: 'john',
      password: '12345678'
    }

    const SUTResponse = SUT.execute(SUTRequest)

    const expectedResponse = {
      status: 'ERROR',
      error: 'User email must be a valid email'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return error when email has more than 255 characters', () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      name: 'John Doe',
      email: Array(255).fill('john').join('.').concat('@doe.com'),
      password: '12345678'
    }

    const SUTResponse = SUT.execute(SUTRequest)

    const expectedResponse = {
      status: 'ERROR',
      error: 'User email must be at most 255 characters long'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return error when password is undefined', () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      name: 'John Doe',
      email: 'john@doe.com'
      // password: '12345678'
    }

    const SUTResponse = SUT.execute(SUTRequest)

    const expectedResponse = {
      status: 'ERROR',
      error: 'User password is required'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return error when password is not a string', () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      name: 'John Doe',
      email: 'john@doe.com',
      password: 12345678
    }

    const SUTResponse = SUT.execute(SUTRequest)

    const expectedResponse = {
      status: 'ERROR',
      error: 'User password must be a string'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return error when password has less than 8 characters', () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      name: 'John Doe',
      email: 'john@doe.com',
      password: '1234567'
    }

    const SUTResponse = SUT.execute(SUTRequest)

    const expectedResponse = {
      status: 'ERROR',
      error: 'User password must be at least 8 characters long'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return error when payload is undefined', () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = undefined

    const SUTResponse = SUT.execute(SUTRequest)

    const expectedResponse = {
      status: 'ERROR',
      error: 'User payload is required'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return error when payload is not an object', () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = 'test'

    const SUTResponse = SUT.execute(SUTRequest)

    const expectedResponse = {
      status: 'ERROR',
      error: 'User payload must be an object'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })
})
