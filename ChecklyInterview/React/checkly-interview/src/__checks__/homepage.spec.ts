import { test, expect } from '@playwright/test'

test('Homepage loads successfully', async ({ page }) => {
  await page.goto('http://localhost:5000') // Replace with your application's URL
  await expect(page).toHaveTitle(/Your App Title/) // Replace with your app's title
})