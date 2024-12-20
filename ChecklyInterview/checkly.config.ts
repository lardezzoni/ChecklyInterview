import { defineConfig } from 'checkly'
import { Frequency } from 'checkly/constructs'

export default defineConfig({
  projectName: 'ChecklyInterview',
  logicalId: 'checkly-interview-1',
  repoUrl: 'https://github.com/lardezzoni/ChecklyInterview',
  checks: {
    activated: true,
    muted: false,
    runtimeId: '2022.10',
    frequency: Frequency.EVERY_5M,
    privateLocations: ['laptop-localhost'], // Replace with your private location slug
    tags: ['react', 'nodejs', 'checkly'],
    checkMatch: '**/__checks__/**/*.check.ts',
    browserChecks: {
      frequency: Frequency.EVERY_10M,
      testMatch: '**/__checks__/**/*.spec.ts',
      privateLocations: ['laptop-localhost'], // Add your private location here
    },
  },
})
