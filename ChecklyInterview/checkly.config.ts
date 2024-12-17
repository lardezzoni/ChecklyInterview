import { defineConfig } from 'checkly'
import { Frequency } from 'checkly/constructs'

export default defineConfig({
  projectName: 'ChecklyInterview',
  logicalId: 'checkly-interview-1',
  repoUrl: 'https://github.com/lardezzoni/ChecklyInterview', // Replace with your repository URL
  checks: {
    activated: true,
    muted: false,
    runtimeId: '2022.10', // Specify the runtime version
    frequency: Frequency.EVERY_5M, // Default frequency for checks
    locations: ['us-east-1', 'eu-west-1'], // Monitoring locations
    tags: ['react', 'nodejs', 'checkly'],
    checkMatch: '**/__checks__/**/*.check.ts', // Pattern to locate check files
    ignoreDirectoriesMatch: [],
    browserChecks: {
      frequency: Frequency.EVERY_10M, // Frequency for browser checks
      testMatch: '**/__checks__/**/*.spec.ts', // Pattern to locate Playwright test files
    },
  },
  cli: {
    runLocation: 'eu-west-1', // Default location for CLI commands
  },
})