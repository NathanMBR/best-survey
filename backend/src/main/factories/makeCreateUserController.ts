import {
  FindUserByEmailService,
  HashStringService,
  CreateUserService
} from '@/services'
import {
  prisma,
  saltRounds
} from '@/config'
import { CreateUserValidator } from '@/validators'
import { CreateUserController } from '@/controllers'

export const makeCreateUserController = () => {
  const createUserValidator = new CreateUserValidator()
  const findUserByEmailService = new FindUserByEmailService(prisma)
  const hashStringService = new HashStringService(saltRounds)
  const createUserService = new CreateUserService(prisma)

  const createUserController = new CreateUserController(
    createUserValidator,
    findUserByEmailService,
    hashStringService,
    createUserService
  )

  return createUserController
}
