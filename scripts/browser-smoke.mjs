import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright-core'

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:5173'
const screenshotDir = process.env.SCREENSHOT_DIR || '/tmp/li-zambia-check'
const systemChromium = '/usr/bin/chromium'
const executablePath = process.env.CHROMIUM_PATH || (existsSync(systemChromium) ? systemChromium : undefined)

await mkdir(screenshotDir, { recursive: true })
const browser = await chromium.launch({
  executablePath,
  headless: true,
  args: ['--no-sandbox'],
})

const errors = []

function watchErrors(page, name) {
  page.on('pageerror', (error) => errors.push(`${name}: ${error.message}`))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`${name}: ${message.text()}`)
  })
}

async function waitForLevel(page, level) {
  await page.waitForFunction(
    (expected) => document.querySelector('#coronation-slider')?.value === String(expected),
    level,
    { timeout: 10_000 },
  )
}

try {
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
  })
  const page = await desktop.newPage()
  watchErrors(page, 'desktop')
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' })
  await page.locator('h1.name').waitFor()

  assert.match(await page.title(), /李酋长/)
  assert.equal(await page.locator('main section').count(), 7)
  assert.equal(await page.locator('#page').getAttribute('data-mode'), 'chief')
  await page.waitForFunction(() => {
    const image = document.querySelector('.portrait img')
    return image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0
  })
  await page.screenshot({ path: `${screenshotDir}/desktop-top.png` })

  await page.getByRole('button', { name: '部长模式', exact: true }).click()
  assert.equal(await page.locator('#page').getAttribute('data-mode'), 'minister')
  assert.match(await page.title(), /李部长/)
  await waitForLevel(page, 0)

  await page.getByRole('button', { name: '酋长模式', exact: true }).click()
  await waitForLevel(page, 100)
  await page.reload({ waitUntil: 'domcontentloaded' })
  assert.equal(await page.locator('#page').getAttribute('data-mode'), 'chief')

  await page.getByRole('button', { name: '42% 授杖', exact: true }).click()
  await waitForLevel(page, 42)
  assert.match(await page.locator('#coronation-status').textContent(), /授杖/)

  const slider = page.locator('#coronation-slider')
  await slider.focus()
  await slider.press('Home')
  assert.equal(await slider.inputValue(), '0')
  await slider.press('End')
  assert.equal(await slider.inputValue(), '100')

  await page.getByRole('button', { name: '0% 部长', exact: true }).click()
  await waitForLevel(page, 0)
  await page.getByRole('button', { name: '▶ 播放大典', exact: true }).click()
  await waitForLevel(page, 100)
  assert.match(await page.locator('#coronation-status').textContent(), /礼成 100%/)
  await page.locator('#coronation').scrollIntoViewIfNeeded()
  await page.locator('.poster').screenshot({ path: `${screenshotDir}/desktop-coronation.png` })

  await page.locator('.deed-head .seal').click()
  assert.match(await page.locator('.stamp-note').textContent(), /御印 1 次/)
  await page.locator('.sign .seal').click()
  assert.match(await page.locator('.stamp-note').textContent(), /御印 2 次/)

  await page.getByRole('button', { name: '⚡ 触发 20 秒爆发演练', exact: true }).click()
  await page.waitForFunction(
    () => document.querySelector('.wow .cd')?.textContent?.includes('爆发完成'),
    null,
    { timeout: 10_000 },
  )
  assert.equal(await page.locator('.rot-step.is-lit').count(), 7)
  await desktop.close()

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    reducedMotion: 'reduce',
  })
  const phone = await mobile.newPage()
  watchErrors(phone, 'mobile')
  await phone.goto(baseUrl, { waitUntil: 'domcontentloaded' })
  await phone.locator('h1.name').waitFor()
  assert.equal(await phone.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true)
  await phone.screenshot({ path: `${screenshotDir}/mobile-top.png` })
  await phone.getByRole('button', { name: '部长模式', exact: true }).click()
  assert.equal(await phone.locator('#page').getAttribute('data-mode'), 'minister')
  await waitForLevel(phone, 0)
  await phone.locator('#coronation').scrollIntoViewIfNeeded()
  await phone.locator('.poster').screenshot({ path: `${screenshotDir}/mobile-coronation.png` })
  assert.equal(await phone.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true)
  await mobile.close()

  assert.deepEqual(errors, [], `浏览器控制台错误：\n${errors.join('\n')}`)
  console.log(`浏览器检查通过；截图保存在 ${screenshotDir}`)
} finally {
  await browser.close()
}
