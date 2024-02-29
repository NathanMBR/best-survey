export namespace Http {
  export class Issue {
    constructor(
      public readonly message: string,
      public readonly code: string
    ) {}
  }

  export type Request = {
    headers?: Record<string, string | Array<string> | undefined>
    params?: unknown
    query?: unknown
    body?: unknown
  }

  export type Response = {
    status: number
    body?: Record<string, unknown> | Issue
  }

  export interface Controller {
    handle(request: Request): Promise<Response>
  }
}
