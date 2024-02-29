import type {
  IFindUserByEmailService,
  IHashStringService,
  ICreateUserService
} from '@/services'
import type { ICreateUserValidator } from '@/validators'
import type { Http } from '../Http'

import { removeSensitiveFields } from '@/utils'
import {
  getInvalidPayloadError,
  getEmailAlreadyUsedError
} from '../errors'

export class CreateUserController {
  constructor(
    private readonly createUserValidator: ICreateUserValidator,
    private readonly findUserByEmailService: IFindUserByEmailService,
    private readonly hashStringService: IHashStringService,
    private readonly createUserService: ICreateUserService
  ) {}

  async handle(body: unknown): Promise<Http.Response> {
    const validation = this.createUserValidator.execute(body)

    if (validation.status === 'ERROR')
      return {
        status: 400,
        body: getInvalidPayloadError(validation.error)
      }

    const userData = validation.data

    const existingUser = await this.findUserByEmailService.execute({ email: userData.email })

    if (existingUser)
      return {
        status: 400,
        body: getEmailAlreadyUsedError()
      }

    const hashedPassword = await this.hashStringService.execute({ text: userData.password })

    const createdUser = await this.createUserService.execute({
      ...userData,
      password: hashedPassword
    })

    const user = removeSensitiveFields(createdUser, 'password')

    return {
      status: 201,
      body: user
    }
  }
}
