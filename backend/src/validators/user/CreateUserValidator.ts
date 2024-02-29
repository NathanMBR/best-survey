import { getZodErrorMessage } from '@/utils'
import { z as zod } from 'zod'

/* eslint-disable camelcase */
const createUserSchema = zod.object({
  name: zod
    .string({
      required_error: 'User name is required',
      invalid_type_error: 'User name must be a string',
      description: 'User name'
    })
    .trim()
    .min(3, 'User name must be at least 3 characters long')
    .max(255, 'User name must be at most 255 characters long'),

  email: zod
    .string({
      required_error: 'User email is required',
      invalid_type_error: 'User email must be a string',
      description: 'User email'
    })
    .email('User email must be a valid email')
    .max(255, 'User email must be at most 255 characters long'),

  password: zod
    .string({
      required_error: 'User password is required',
      invalid_type_error: 'User password must be a string',
      description: 'User password'
    })
    .min(8, 'User password must be at least 8 characters long')
}, {
  required_error: 'User payload is required',
  invalid_type_error: 'User payload must be an object',
  description: 'User payload'
})
/* eslint-enable camelcase */

export namespace ICreateUserValidator {
  export type Request = unknown

  type SuccessResponse = {
    status: 'SUCCESS'
    data: zod.infer<typeof createUserSchema>
  }

  type ErrorResponse = {
    status: 'ERROR'
    error: string
  }

  export type Response = SuccessResponse | ErrorResponse
}

export interface ICreateUserValidator {
  execute: (data: ICreateUserValidator.Request) => ICreateUserValidator.Response
}

export class CreateUserValidator implements ICreateUserValidator {
  execute(data: ICreateUserValidator.Request) {
    const validation = createUserSchema.safeParse(data)

    if (!validation.success)
      return {
        status: 'ERROR' as const,
        error: getZodErrorMessage(validation.error)
      }

    return {
      status: 'SUCCESS' as const,
      data: validation.data
    }
  }
}
