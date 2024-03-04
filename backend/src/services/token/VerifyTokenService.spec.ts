import {
  describe,
  it,
  expect,
  vi
} from 'vitest'
import jwt from 'jsonwebtoken'

import { VerifyTokenService } from './VerifyTokenService'

vi.spyOn(jwt, 'verify').mockImplementation(
  () => ({
    sub: 'test_sub',
    test: 'test'
  })
)

const getSUTEnvironment = () => {
  const secret = 'test_secret'

  const SUT = new VerifyTokenService(
    secret
  )

  return {
    SUT
  }
}

describe('VerifyTokenService', () => {
  it('should successfully verify a token', () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      token: 'test_token'
    }

    const SUTResponse = SUT.execute(SUTRequest)

    const expectedResponse = {
      status: 'SUCCESS',
      data: {
        sub: 'test_sub',
        test: 'test'
      }
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return UNKNOWN_SUBJECT_ERROR if token data is a string', () => {
    const { SUT } = getSUTEnvironment()

    vi.spyOn(jwt, 'verify').mockImplementationOnce(
      () => 'test_token_data'
    )

    const SUTRequest = {
      token: 'test_token'
    }

    const SUTResponse = SUT.execute(SUTRequest)

    const expectedResponse = {
      status: 'UNKNOWN_SUBJECT_ERROR'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return UNKNOWN_SUBJECT_ERROR if sub property from token data is not a string', () => {
    const { SUT } = getSUTEnvironment()

    vi.spyOn(jwt, 'verify').mockImplementationOnce(
      () => ({
        sub: () => 'test_sub',
        test: 'test'
      })
    )

    const SUTRequest = {
      token: 'test_token'
    }

    const SUTResponse = SUT.execute(SUTRequest)

    const expectedResponse = {
      status: 'UNKNOWN_SUBJECT_ERROR'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return TOKEN_EXPIRED_ERROR if jwt.verify() throws TokenExpiredError', () => {
    const { SUT } = getSUTEnvironment()

    vi.spyOn(jwt, 'verify').mockImplementationOnce(
      () => {
        throw new jwt.TokenExpiredError('test_message', new Date())
      }
    )

    const SUTRequest = {
      token: 'test_token'
    }

    const SUTResponse = SUT.execute(SUTRequest)

    const expectedResponse = {
      status: 'TOKEN_EXPIRED_ERROR'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return NOT_BEFORE_ERROR if jwt.verify() throws NotBeforeError', () => {
    const { SUT } = getSUTEnvironment()

    vi.spyOn(jwt, 'verify').mockImplementationOnce(
      () => {
        throw new jwt.NotBeforeError('test_message', new Date())
      }
    )

    const SUTRequest = {
      token: 'test_token'
    }

    const SUTResponse = SUT.execute(SUTRequest)

    const expectedResponse = {
      status: 'NOT_BEFORE_ERROR'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return JWT_ERROR if jwt.verify() throws JsonWebTokenError', () => {
    const { SUT } = getSUTEnvironment()

    vi.spyOn(jwt, 'verify').mockImplementationOnce(
      () => {
        throw new jwt.JsonWebTokenError('test_message')
      }
    )

    const SUTRequest = {
      token: 'test_token'
    }

    const SUTResponse = SUT.execute(SUTRequest)

    const expectedResponse = {
      status: 'JWT_ERROR',
      error: 'test_message'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return UNEXPECTED_ERROR if an unknown error throws', () => {
    const { SUT } = getSUTEnvironment()

    const testError = new Error('test_message')

    vi.spyOn(jwt, 'verify').mockImplementationOnce(
      () => {
        throw testError
      }
    )

    const SUTRequest = {
      token: 'test_token'
    }

    const SUTResponse = SUT.execute(SUTRequest)

    const expectedResponse = {
      status: 'UNEXPECTED_ERROR',
      error: testError
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should not throw error', () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      token: 'test_token'
    }

    const getSUTResponse = () => SUT.execute(SUTRequest)

    expect(getSUTResponse).not.toThrow()
  })
})
