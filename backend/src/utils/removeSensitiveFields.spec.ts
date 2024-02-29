import {
  describe,
  it,
  expect
} from 'vitest'

import { removeSensitiveFields } from './removeSensitiveFields'

describe('removeSensitiveFields', () => {
  it('should successfully remove sensitive fields', () => {
    const SUTRequest = {
      foo: 'foo',
      test: 'test'
    }

    const SUTResponse = removeSensitiveFields(SUTRequest, ['foo'])

    expect(SUTResponse).not.toHaveProperty('foo')
    expect(SUTResponse).toHaveProperty('test', 'test')
  })

  it('should remove internalId and deletedAt even if not specified', () => {
    const SUTRequest = {
      internalId: 1,
      deletedAt: new Date(),
      test: 'test'
    }

    const SUTResponse = removeSensitiveFields(SUTRequest, [])

    expect(SUTResponse).not.toHaveProperty('internalId')
    expect(SUTResponse).not.toHaveProperty('deletedAt')
    expect(SUTResponse).toHaveProperty('test', 'test')
  })

  it('should keep all properties when payload does not have either default or additional fields to remove', () => {
    const SUTRequest = {
      test: 'test',
      foo: 'foo',
      bar: 'bar'
    }

    const SUTResponse = removeSensitiveFields(SUTRequest, [])

    expect(SUTResponse).toEqual(SUTRequest)
  })
})
