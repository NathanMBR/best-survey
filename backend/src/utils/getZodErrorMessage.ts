import { ZodError } from 'zod'

export const getZodErrorMessage = (error: ZodError): string => {
  const message: string = error.errors[0]?.message || 'Unknown error'

  return message
}
