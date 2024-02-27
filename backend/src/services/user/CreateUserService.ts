import type {
  Prisma,
  PrismaClient,
  User
} from '@prisma/client'

export class CreateUserService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(dto: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.create({
      data: dto
    })

    return user
  }
}
