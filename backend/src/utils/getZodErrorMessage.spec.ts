import {
  describe,
  it,
  expect
} from 'vitest'
import { ZodError } from 'zod'

import { getZodErrorMessage } from './getZodErrorMessage'

describe('getZodErrorMessage', () => {
  it('should successfully get zod error message', () => {
    const SUTResponse = getZodErrorMessage(
      new ZodError([
        {
          path: [],
          code: 'custom',
          message: 'Test message'
        }
      ])
    )

    expect(SUTResponse).toBe('Test message')
  })

  it('should return only the first error message', () => {
    const SUTResponse = getZodErrorMessage(
      new ZodError([
        {
          path: [],
          code: 'custom',
          message: 'Test message 1'
        },

        {
          path: [],
          code: 'custom',
          message: 'Test message 2'
        },

        {
          path: [],
          code: 'custom',
          message: 'Test message 3'
        }
      ])
    )

    expect(SUTResponse).toBe('Test message 1')
  })

  it('should return "Unknown error" if error message is not found', () => {
    const SUTResponse = getZodErrorMessage(
      new ZodError([])
    )

    expect(SUTResponse).toBe('Unknown error')
  })
})
