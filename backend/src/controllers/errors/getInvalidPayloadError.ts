export const getInvalidPayloadError = (message: string) => {
  const error = {
    message,
    code: 'INVALID_PAYLOAD'
  }

  return error
}
