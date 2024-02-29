import { Http } from '../Http'

export const getEmailAlreadyUsedError = () => new Http.Issue(
  'Email already used',
  'EMAIL_ALREADY_USED'
)
