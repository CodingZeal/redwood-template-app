import { chromium } from '@playwright/test'

async function globalSetup() {
  const URL = 'http://localhost:8910'
  const browser = await chromium.launch()
  const adminLogin = await browser.newPage()
  await adminLogin.goto(`${URL}/login`)

  const usernameInput = adminLogin.getByLabel('username')
  await usernameInput.click()
  await usernameInput.fill('admin@example.com')

  const passwordInput = adminLogin.getByLabel('password')
  await passwordInput.click()
  await passwordInput.fill('password')

  await adminLogin.getByRole('button', { name: 'Login' }).click()
  await adminLogin.waitForURL(URL, { waitUntil: 'domcontentloaded' })

  await adminLogin
    .context()
    .storageState({ path: 'web/tests/storage/adminUser-pw.json' })

  const userLogin = await browser.newPage()
  await userLogin.goto(`${URL}/login`)

  await userLogin.locator('input[name="username"]').click()
  await userLogin.locator('input[name="username"]').fill('user@example.com')
  await userLogin.locator('input[name="password"]').click()
  await userLogin.locator('input[name="password"]').fill('password')
  await userLogin.getByRole('button', { name: 'Login' }).click()
  await userLogin.waitForURL(URL, { waitUntil: 'domcontentloaded' })

  await userLogin
    .context()
    .storageState({ path: 'web/tests/storage/basicUser-pw.json' })

  await browser.close()
}

export default globalSetup
