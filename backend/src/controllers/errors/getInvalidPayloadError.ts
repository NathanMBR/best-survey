import { Http } from '../Http'

export const getInvalidPayloadError = (message: string) => new Http.Issue(
  message,
  'INVALID_PAYLOAD'
)
