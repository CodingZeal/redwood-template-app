import { test, expect } from '@playwright/test'

test.describe('login as a user', () => {
  test('should login user', async ({ page }) => {
    await page.goto('/')

    await page.locator('text=Login').click()
    await page.waitForURL('/login')
    const loginTitle = await page.locator('.rw-heading-secondary')
    await expect(loginTitle).toBeVisible()
    await expect(loginTitle).toHaveText('Login')

    await page.locator('input[name="username"]').click()
    await page.locator('input[name="username"]').fill('admin@example.com')
    await page.locator('input[name="password"]').click()
    await page.locator('input[name="password"]').fill('password')

    await page.locator('button:has-text("Login")').click()
    await page.waitForURL('/')

    const logoutTitle = await page.locator('text=Logout')
    await expect(logoutTitle).toBeVisible()
    await page.locator('text=Logout').click()
    await page.waitForURL('/')

    const title = await page.locator('text=Login')
    await expect(title).toBeVisible()
  })
})
