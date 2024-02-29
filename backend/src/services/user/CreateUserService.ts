import type {
  Prisma,
  PrismaClient,
  User
} from '@prisma/client'

export namespace ICreateUserService {
  export type Request = Prisma.UserCreateInput

  export type Response = Promise<User>
}

export interface ICreateUserService {
  execute: (dto: ICreateUserService.Request) => ICreateUserService.Response
}

export class CreateUserService implements ICreateUserService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(dto: ICreateUserService.Request) {
    const user = await this.prisma.user.create({
      data: dto
    })

    return user
  }
}
