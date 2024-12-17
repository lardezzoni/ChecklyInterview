import { expect, test, Page } from '@playwright/test'

test('evaluate performance metrics', async ({ page }: { page: Page }) => {
  // Set timeout for the test
  test.setTimeout(210000)

  // Set action timeout for quicker failure detection
  const actionTimeout = 10000

  // Navigate to the target URL
  const url = process.env.ENVIRONMENT_URL || 'http://localhost:5000'
  await page.goto(url, { timeout: actionTimeout })

  // Inject a PerformanceObserver to access web performance metrics
  const LCP = await page.evaluate(() => {
    return new Promise<number>((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const LCP: any = entries.at(-1) // Safely cast to any
        resolve(LCP?.startTime || 0)
      }).observe({
        type: 'largest-contentful-paint' as any, // Fix type issue
        buffered: true,
      })
    })
  })

  // Log and assert Largest Contentful Paint
  console.log('Largest Contentful Paint:', LCP)
  expect(LCP).toBeGreaterThan(0)
  expect(LCP).toBeLessThan(1000) // Assert LCP is under 1000ms
})
