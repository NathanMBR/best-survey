import {
  describe,
  it,
  expect,
  vi
} from 'vitest'
import jwt from 'jsonwebtoken'

import { SignTokenService } from './SignTokenService'

vi.spyOn(jwt, 'sign').mockImplementation(
  () => 'test_token'
)

const getSUTEnvironment = () => {
  const secret = 'test_secret'
  const expiresIn = 'test_expires_in'

  const SUT = new SignTokenService(
    secret,
    expiresIn
  )

  return {
    SUT
  }
}

describe('SignTokenService', () => {
  it('should successfully sign a token', () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      payload: {
        test: 'test'
      },
      userId: 'test_user_id'
    }

    const SUTResponse = SUT.execute(SUTRequest)
    const expectedResponse = 'test_token'

    expect(SUTResponse).toBe(expectedResponse)
  })
})
