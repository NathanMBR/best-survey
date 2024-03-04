import jwt from 'jsonwebtoken'

export namespace ISignTokenService {
  export type Request = {
    payload: Record<string, unknown>
    userId: string
  }

  export type Response = string
}

export interface ISignTokenService {
  execute: (request: ISignTokenService.Request) => ISignTokenService.Response
}

export class SignTokenService implements ISignTokenService {
  constructor(
    private readonly secret: string,
    private readonly expiresIn: string
  ) {}

  execute({ payload, userId }: ISignTokenService.Request) {
    const token = jwt.sign(
      payload,
      this.secret,
      {
        expiresIn: this.expiresIn,
        subject: userId
      }
    )

    return token
  }
}
