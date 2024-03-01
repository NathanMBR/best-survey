import {
  describe,
  it,
  expect,
  vi
} from 'vitest'
import bcrypt from 'bcrypt'

import { HashStringService } from './HashStringService'

const genSaltFn = vi.fn(
  () => Promise.resolve('test_salt')
)

vi.spyOn(bcrypt, 'genSalt').mockImplementation(
  genSaltFn
)

vi.spyOn(bcrypt, 'hash').mockImplementation(
  () => Promise.resolve('test_hash')
)

const getSUTEnvironment = () => {
  const saltRounds = 10
  const SUT = new HashStringService(saltRounds)

  return {
    SUT,

    saltRounds
  }
}

describe('HashStringService', () => {
  it('should successfully hash a string', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      text: 'test_text'
    }

    const SUTResponse = await SUT.execute(SUTRequest)

    const expectedResponse = 'test_hash'

    expect(SUTResponse).toBe(expectedResponse)
  })

  it('should pass saltRounds to genSalt', async () => {
    const { SUT, saltRounds } = getSUTEnvironment()

    const SUTRequest = {
      text: 'test_text'
    }

    await SUT.execute(SUTRequest)

    expect(genSaltFn).toHaveBeenCalledWith(saltRounds)
  })
})
