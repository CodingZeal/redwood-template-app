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

    await page.getByText('Login').click()
    await page.waitForURL('/login')
    const loginTitle = page.locator('.rw-heading-secondary')
    expect(loginTitle)
    await expect(loginTitle).toHaveText('Login')

    await page.getByText('Sign up!').click()
    await page.waitForURL('/signup')

    const signupTitle = page.locator('.rw-heading-secondary')
    expect(signupTitle)
    await expect(signupTitle).toHaveText('Signup')

    const usernameInput = page.locator('input[name="username"]')
    await usernameInput.click()
    await usernameInput.fill(MOCK_USER.email)

    const passwordInput = page.locator('input[name="password"]')
    await passwordInput.click()
    await passwordInput.fill('example')

    await page.locator('button:has-text("Sign Up")').click()
    await page.waitForURL('/')
  })
})
