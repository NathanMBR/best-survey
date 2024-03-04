import jwt from 'jsonwebtoken'

export namespace IVerifyTokenService {
  export type Request = {
    token: string
  }

  type SuccessResponse = {
    status: 'SUCCESS'
    data: {
      sub: string
      [key: string]: unknown
    }
  }

  type UnknownSubjectError = {
    status: 'UNKNOWN_SUBJECT_ERROR'
  }

  type TokenExpiredErrorResponse = {
    status: 'TOKEN_EXPIRED_ERROR'
  }

  type JWTErrorResponse = {
    status: 'JWT_ERROR'
    error: string
  }

  type NotBeforeErrorResponse = {
    status: 'NOT_BEFORE_ERROR'
  }

  type UnexpectedErrorResponse = {
    status: 'UNEXPECTED_ERROR'
    error: unknown
  }

  export type Response =
    SuccessResponse |
    UnknownSubjectError |
    TokenExpiredErrorResponse |
    JWTErrorResponse |
    NotBeforeErrorResponse |
    UnexpectedErrorResponse
}

export interface IVerifyTokenService {
  execute: (request: IVerifyTokenService.Request) => IVerifyTokenService.Response
}

export class VerifyTokenService implements IVerifyTokenService {
  constructor(private readonly secret: string) {}

  execute({ token }: IVerifyTokenService.Request): IVerifyTokenService.Response {
    try {
      const decodedTokenData = jwt.verify(token, this.secret)

      if (typeof decodedTokenData === 'string' || typeof decodedTokenData.sub !== 'string')
        return {
          status: 'UNKNOWN_SUBJECT_ERROR'
        }

      const { sub, ...rest } = decodedTokenData

      return {
        status: 'SUCCESS',
        data: {
          sub,
          ...rest
        }
      }
    } catch (error) {
      const {
        TokenExpiredError,
        JsonWebTokenError,
        NotBeforeError
      } = jwt

      if (error instanceof TokenExpiredError)
        return {
          status: 'TOKEN_EXPIRED_ERROR'
        }

      if (error instanceof NotBeforeError)
        return {
          status: 'NOT_BEFORE_ERROR'
        }

      if (error instanceof JsonWebTokenError)
        return {
          status: 'JWT_ERROR',
          error: error.message
        }

      return {
        status: 'UNEXPECTED_ERROR',
        error: error
      }
    }
  }
}
