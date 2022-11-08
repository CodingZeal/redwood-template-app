import { test, expect } from '@playwright/test'

// test.afterEach(async ({ page }, testInfo) => {
//   console.log(`Finished ${testInfo.title} with status ${testInfo.status}`)
// })

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
    await page.locator('input[name="username"]').fill('example@example.com')
    await page.locator('input[name="password"]').click()
    await page.locator('input[name="password"]').fill('example')

    await page.locator('button:has-text("Sign Up")').click()
    await page.waitForURL('/')
  })
})
