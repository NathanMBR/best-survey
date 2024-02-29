import bcrypt from 'bcrypt'

export namespace IHashStringService {
  export type Request = {
    text: string
  }

  export type Response = Promise<string>
}

export interface IHashStringService {
  execute: (request: IHashStringService.Request) => IHashStringService.Response
}

export class HashStringService implements IHashStringService {
  constructor(private readonly saltRounds: number) {}

  async execute({ text }: IHashStringService.Request) {
    const salt = await bcrypt.genSalt(this.saltRounds)

    const hash = await bcrypt.hash(text, salt)

    return hash
  }
}
