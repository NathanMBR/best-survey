import type {
  PrismaClient,
  User
} from '@prisma/client'

export class FindUserByEmailService {
  constructor(
    private readonly prisma: PrismaClient
  ) {}

  async execute(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email
      }
    })

    return user
  }
}
