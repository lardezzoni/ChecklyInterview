import { Browser } from 'playwright'

export default async function performanceCheck() {
  const { chromium } = require('playwright')

  const browser: Browser = await chromium.launch()
  const page = await browser.newPage()

  const url = process.env.ENVIRONMENT_URL || 'https://ardezzoni.ngrok.dev'
  await page.goto(url)

  const LCP = await page.evaluate(() => {
    return new Promise<number>((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const LCP = entries.at(-1) as any
        resolve(LCP?.startTime || 0)
      }).observe({
        type: 'largest-contentful-paint' as any, // Fix the typing issue here
        buffered: true,
      })
    })
  })

  console.log('Largest Contentful Paint:', LCP)

  ///////////////////////////
  //LCP (Largest Contentful Paint) is a key performance metric used to measure the perceived loading performance of a web page
  //less than 2.5 sec == good, more than 4 == poor, between that == needs improv
  ////////////////////////
  if (LCP > 4000) {
    throw new Error(`LCP exceeded threshold: ${LCP}ms`)
  }

  await browser.close()
}
