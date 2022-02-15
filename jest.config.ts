import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  clearMocks: true,
  coverageProvider: 'v8',
  projects: ['<rootDir>/packages/mask', '<rootDir>/packages/schema'],
  testMatch: ['*.spec.ts']
}

export default config
