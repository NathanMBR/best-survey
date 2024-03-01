/// <reference types="vitest" />
import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig(
  async () => {
    return {
      root: path.resolve(__dirname),
      resolve: {
        alias: [
          {
            find: '@',
            replacement: path.resolve(__dirname, './src')
          },
          {
            find: '@test',
            replacement: path.resolve(__dirname, './test')
          }
        ]
      },
      test: {
        watch: false,
        exclude: [
          'node_modules',
          'build',
          '.git'
        ]
      }
    }
  }
)
