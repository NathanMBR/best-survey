export const getEmailAlreadyUsedError = () => {
  const error = {
    message: 'Email already used',
    code: 'EMAIL_ALREADY_USED'
  }

  return error
}
