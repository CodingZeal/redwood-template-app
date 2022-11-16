import { chromium } from '@playwright/test'

async function globalSetup() {
  const browser = await chromium.launch()
  const adminLogin = await browser.newPage()
  await adminLogin.goto('http://localhost:8910/login')
  await adminLogin.locator('input[name="username"]').click()
  await adminLogin.locator('input[name="username"]').fill('admin@example.com')
  await adminLogin.locator('input[name="password"]').click()
  await adminLogin.locator('input[name="password"]').fill('password')
  await adminLogin.locator('button:has-text("Login")').click()
  await adminLogin.waitForURL('http://localhost:8910')
  await adminLogin
    .context()
    .storageState({ path: 'web/tests/storage/adminUser-pw.json' })

  const userLogin = await browser.newPage()
  await userLogin.goto('http://localhost:8910/login')
  await userLogin.locator('input[name="username"]').click()
  await userLogin.locator('input[name="username"]').fill('user@example.com')
  await userLogin.locator('input[name="password"]').click()
  await userLogin.locator('input[name="password"]').fill('password')
  await userLogin.locator('button:has-text("Login")').click()
  await userLogin.waitForURL('http://localhost:8910')
  await userLogin
    .context()
    .storageState({ path: 'web/tests/storage/basicUser-pw.json' })

  await browser.close()
}

export default globalSetup
