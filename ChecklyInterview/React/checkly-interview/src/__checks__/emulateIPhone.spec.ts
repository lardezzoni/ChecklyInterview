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
  const url = process.env.URL || 'https://ardezzoni.ngrok.dev'
  const tempDir = path.join(__dirname, '__checks__', 'temp');

  /////////////////////////
  // Ensure the temp directory exists
  /////////////////////////
  
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const iPhone = devices['iPhone SE'];

  /////////////////////////
  // Initialize a new page with iPhone settings
  /////////////////////////
  const page = await browser.newPage({
    ...iPhone,
  });

  await page.goto(url);

  // Save the screenshot in the 'temp' directory
  await page.screenshot({ path: path.join(tempDir, 'screenshot.png') });
  console.log(`Screenshot saved to ${path.join(tempDir, 'screenshot.png')}`);
});
