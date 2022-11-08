import { test, expect } from '@playwright/test'

test.describe('forgot password', () => {
  test('should fill out forgot password input', async ({ page }) => {
    await page.goto('/')
    await page.locator('text=Login').click()
    await page.waitForURL('/login')
    const loginTitle = await page.locator('.rw-heading-secondary')
    await expect(loginTitle).toBeVisible()
    await expect(loginTitle).toHaveText('Login')

    await page.locator('text=Forgot Password?').click()
    await page.waitForURL('/forgot-password')

    const forgotPasswordTitle = await page.locator('.rw-heading-secondary')
    await expect(forgotPasswordTitle).toBeVisible()
    await expect(forgotPasswordTitle).toHaveText('Forgot Password')

    await page.locator('input[name=username]').click()
    await page.locator('input[name=username]').fill('admin@example.com')

    await page.locator('text=Submit').click()
    await page.waitForURL('/login')
    const toastMessage = await page.locator(
      'text=A link to reset your password was sent to admin@example.com'
    )
    await expect(toastMessage).toBeVisible()
  })
})
