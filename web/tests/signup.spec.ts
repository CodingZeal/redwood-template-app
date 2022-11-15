import { test, expect } from '@playwright/test'

import { db } from '../../api/src/lib/db'

const MOCK_USER = {
  email: 'snap@cracklepop.com',
}

test.afterAll(async () => {
  await db.user.delete({ where: { email: MOCK_USER.email } })
})

test.describe('signup as a user', () => {
  test('should signup user', async ({ page }) => {
    await page.goto('/')

    await page.locator('text=Login').click()
    await page.waitForURL('/login')
    const loginTitle = await page.locator('.rw-heading-secondary')
    await expect(loginTitle).toBeVisible()
    await expect(loginTitle).toHaveText('Login')

    await page.locator('text=Sign up!').click()
    await page.waitForURL('/signup')

    const signupTitle = await page.locator('.rw-heading-secondary')
    await expect(signupTitle).toBeVisible()
    await expect(signupTitle).toHaveText('Signup')

    await page.locator('input[name="username"]').click()
    await page.locator('input[name="username"]').fill(MOCK_USER.email)
    await page.locator('input[name="password"]').click()
    await page.locator('input[name="password"]').fill('example')

    await page.locator('button:has-text("Sign Up")').click()
    test.slow()
    await page.waitForURL('/')
  })
})
