export namespace Http {
  export class Issue {
    constructor(
      public readonly message: string,
      public readonly code: string
    ) {}
  }

  export type Response = {
    status: number
    body: Record<string, unknown> | Issue
  }
}
