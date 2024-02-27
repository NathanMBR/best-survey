import bcrypt from 'bcrypt'

export class CompareHashedString {
  async execute(text: string, hash: string): Promise<boolean> {
    const result = await bcrypt.compare(text, hash)

    return result
  }
}
