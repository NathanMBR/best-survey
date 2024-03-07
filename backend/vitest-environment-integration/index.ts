import type { Environment } from 'vitest'

import crypto from 'node:crypto'
import childProcess from 'node:child_process'
import { PrismaClient } from '@prisma/client'

export default <Environment> {
  name: 'integration',
  transformMode: 'ssr',
  async setup() {
    const schema = `test_${crypto.randomUUID()}`
    const testDatabaseUrl = process.env.DATABASE_URL!.replace('?schema=public', `?schema=${schema}`)

    process.env.DATABASE_URL = testDatabaseUrl
    process.env.FASTIFY_LOGGER = 'false'

    childProcess.execSync(
      'pnpm exec prisma migrate deploy',
      {
        cwd: process.cwd(),
        env: {
          ...process.env,
          DATABASE_URL: testDatabaseUrl
        }
      }
    )

    return {
      async teardown() {
        const prisma = new PrismaClient({
          datasources: {
            db: {
              url: testDatabaseUrl
            }
          }
        })

        await prisma.$connect()
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
        await prisma.$disconnect()
      }
    }
  }
}
