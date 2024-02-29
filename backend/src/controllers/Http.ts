export namespace Http {
  export class Issue {
    constructor(
      public readonly message: string,
      public readonly code: string
    ) {}
  }

  export type Request = {
    headers?: Record<string, string>
    params?: Record<string, string>
    query?: Record<string, string>
    body?: unknown
  }

  export type Response = {
    status: number
    body: Record<string, unknown> | Issue
  }
}
