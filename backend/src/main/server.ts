import { PORT } from '@/config'
import { createApp } from './app'

/* eslint-disable no-console */
const startServer = async () => {
  const app = await createApp()

  const address = await app.listen({
    port: PORT,
    host: '0.0.0.0'
  })

  console.log(`Server online at ${address}`)
}

startServer()
