import { test, expect } from '@playwright/test'
import { defineConfig } from '@playwright/test';

// you need to run npx checkly test --env .checkly,env
test('Homepage loads successfully', async ({ page }) => {

  console.log('Loaded URL:', process.env.URL); 
  await page.goto(`${process.env.URL}`) 
  await expect(page).toHaveTitle(`React App`) 
})