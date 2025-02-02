import { defineConfig } from 'checkly';
import { Frequency } from 'checkly/constructs';
import * as dotenv from 'dotenv';

dotenv.config({ path: './.checkly.env' });

export default defineConfig({
  projectName: 'ChecklyInterview',
  logicalId: 'checkly-interview-1',
  repoUrl: 'https://github.com/lardezzoni/ChecklyInterview',
  checks: {
    activated: true,
    muted: false,
    runtimeId: '2022.10',
    frequency: Frequency.EVERY_5M,
    locations: ['eu-central-1'], 
    tags: ['react', 'nodejs', 'checkly'],
    checkMatch: '**/__checks__/**/*.check.ts',
    ignoreDirectoriesMatch: [],
    browserChecks: {
      frequency: Frequency.EVERY_10M,
      testMatch: '**/__checks__/**/*.spec.ts',
    },

    environmentVariables: [
      { key: 'URL', value: process.env.URL || 'https://ardezzoni.ngrok.dev' },
    ],
  },
});