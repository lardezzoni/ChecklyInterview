import { test, expect } from '@playwright/test'
import { defineConfig } from '@playwright/test';

// you need to run npx checkly test --env .checkly,env
test('Homepage loads successfully', async ({ page }) => {

  console.log('Loaded URL:', process.env.URL); 
  await page.goto(`${process.env.URL}`) 
  await expect(page).toHaveTitle(`React App`) 
})

test('Homepage performance check', async ({ page }) => {
  await page.goto(`${process.env.URL}`);

  const performanceTiming = await page.evaluate(() => {
    const { loadEventEnd, navigationStart } = performance.timing;
    return loadEventEnd - navigationStart;
  });

  console.log(`Page load time: ${performanceTiming} ms`);


  expect(performanceTiming).toBeLessThan(3000); 
});


test('404 page test', async ({ page, context }) => {


  await page.goto(`${process.env.URL}/non-existent-page`);

  const errorMessage = page.locator('h1');
  await expect(errorMessage).toHaveText('Page not found');


});