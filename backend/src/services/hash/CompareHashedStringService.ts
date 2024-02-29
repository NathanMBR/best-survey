import bcrypt from 'bcrypt'

export namespace ICompareHashedStringService {
  export type Request = {
    text: string
    hash: string
  }

  export type Response = Promise<boolean>
}

export interface ICompareHashedStringService {
  execute: (request: ICompareHashedStringService.Request) => ICompareHashedStringService.Response
}

export class CompareHashedStringService implements ICompareHashedStringService {
  async execute({ text, hash }: ICompareHashedStringService.Request) {
    const result = await bcrypt.compare(text, hash)

    return result
  }
}
