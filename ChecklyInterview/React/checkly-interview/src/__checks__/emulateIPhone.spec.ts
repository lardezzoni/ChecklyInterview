const { devices, test } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

/////////////////////////
// ensure temp exists or create a new dir
/////////////////////////





test.setTimeout(210000);

test.use({ actionTimeout: 10000 });


/////////////////////////
// checkly test taking a screenshot
/////////////////////////

test('emulate a mobile device', async ({ browser }) => {
  const tempDir = path.join(__dirname, 'temp');


  const iPhone = devices['iPhone SE'];
  
  // Initialize a new page with iPhone settings
  const page = await browser.newPage({
    ...iPhone,
  });

  await page.goto(process.env.URL);

  // Save the screenshot in the 'temp' directory
  await page.screenshot({ path: path.join(tempDir, 'screenshot.png') });
  console.log(`Screenshot saved to ${path.join(tempDir, 'screenshot.png')}`);
});