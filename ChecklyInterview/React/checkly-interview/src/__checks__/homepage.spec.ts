import { test, expect } from '@playwright/test'

test('Homepage loads successfully', async ({ page }) => {
  await page.goto('http://192.168.0.38:5000') // Replace with your application's URL
  await expect(page).toHaveTitle('React App') // Replace with your app's title
})