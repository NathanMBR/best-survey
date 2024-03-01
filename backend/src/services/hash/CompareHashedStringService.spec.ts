import {
  describe,
  it,
  expect,
  vi
} from 'vitest'
import bcrypt from 'bcrypt'

import { CompareHashedStringService } from './CompareHashedStringService'

vi.spyOn(bcrypt, 'compare').mockImplementation(
  () => Promise.resolve(true)
)

const getSUTEnvironment = () => {
  const SUT = new CompareHashedStringService()

  return {
    SUT
  }
}

describe('CompareHashedStringService', () => {
  it('should successfully compare hashed string', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      text: 'test_text',
      hash: 'test_hash'
    }

    const SUTResponse = await SUT.execute(SUTRequest)

    const expectedResponse = true

    expect(SUTResponse).toBe(expectedResponse)
  })
})
