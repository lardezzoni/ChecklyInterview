import { defineConfig } from 'checkly'
import { Frequency } from 'checkly/constructs'
import * as dotenv from 'dotenv';
dotenv.config({ path: './.checkly.env' });

// you need to run npx checkly test --env .checkly,env

export default defineConfig({
  projectName: 'ChecklyInterview',
  logicalId: 'checkly-interview-1',
  repoUrl: 'https://github.com/lardezzoni/ChecklyInterview', 
  checks: {
    activated: true,
    muted: false,
    runtimeId: '2022.10', 
    frequency: Frequency.EVERY_5M,
    locations: [], 
    privateLocations: ['laptop-localhost'], 
    tags: ['react', 'nodejs', 'checkly'],
    checkMatch: '**/__checks__/**/*.check.ts', 
    ignoreDirectoriesMatch: [],
    browserChecks: {
      frequency: Frequency.EVERY_10M, 
      testMatch: '**/__checks__/**/*.spec.ts', 
      privateLocations: ['laptop-localhost'], 
    },
  },
})
