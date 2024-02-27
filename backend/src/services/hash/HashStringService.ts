import bcrypt from 'bcrypt'

export class HashStringService {
  constructor(private readonly saltRounds: number) {}

  async execute(text: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds)

    const hash = await bcrypt.hash(text, salt)

    return hash
  }
}
