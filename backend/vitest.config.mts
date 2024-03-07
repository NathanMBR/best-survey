/// <reference types="vitest" />
import {
  defineConfig,
  configDefaults
} from 'vitest/config'
import path from 'node:path'

export default defineConfig(
  async () => {
    return {
      root: path.resolve(__dirname),
      resolve: {
        alias: [
          {
            find: '@',
            replacement: path.resolve(__dirname, './src')
          }
        ]
      },
      test: {
        watch: false,
        exclude: [
          ...configDefaults.exclude,
          'node_modules',
          'build',
          '.git'
        ],
        coverage: {
          reporter: ['text', 'html'],
          exclude: [
            ...configDefaults.exclude,
            'vitest-environment-integration',
            // for some reason it doesn't remove the files bellow
            './src/main/index.ts',
            './src/main/server.ts'
          ]
        }
      }
    }
  }
)
