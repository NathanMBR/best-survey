import type {
  PrismaClient,
  User
} from '@prisma/client'

export namespace IFindUserByEmailService {
  export type Request = {
    email: string
  }

  export type Response = Promise<User | null>
}

export interface IFindUserByEmailService {
  execute: (dto: IFindUserByEmailService.Request) => IFindUserByEmailService.Response
}

export class FindUserByEmailService implements IFindUserByEmailService {
  constructor(
    private readonly prisma: PrismaClient
  ) {}

  async execute({ email }: IFindUserByEmailService.Request) {
    const user = await this.prisma.user.findFirst({
      where: {
        email
      }
    })

    return user
  }
}
