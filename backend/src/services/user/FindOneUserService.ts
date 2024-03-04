import type {
  PrismaClient,
  User
} from '@prisma/client'

export namespace IFindOneUserService {
  export type Request = {
    id: string
  }

  export type Response = Promise<User | null>
}

export interface IFindOneUserService {
  execute: (dto: IFindOneUserService.Request) => IFindOneUserService.Response
}

export class FindOneUserService implements IFindOneUserService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute({ id }: IFindOneUserService.Request) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
        deletedAt: null
      }
    })

    return user
  }
}
