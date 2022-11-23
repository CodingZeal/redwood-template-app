import { test, expect } from '@playwright/test'

test.describe('forgot password', () => {
  test('should fill out forgot password input', async ({ page }) => {
    await page.goto('/')
    await page.getByText('Login').click()
    await page.waitForURL('/login')
    const loginTitle = page.locator('.rw-heading-secondary')
    await expect(loginTitle).toBeVisible()
    await expect(loginTitle).toHaveText('Login')

    await page.getByText('Forgot Password?').click()
    await page.waitForURL('/forgot-password')

    const forgotPasswordTitle = page.locator('.rw-heading-secondary')
    await expect(forgotPasswordTitle).toBeVisible()
    await expect(forgotPasswordTitle).toHaveText('Forgot Password')

    const usernameInput = page.locator('input[name=username]')
    await usernameInput.click()
    await usernameInput.fill('admin@example.com')

    await page.getByText('Submit').click()
    await page.waitForURL('/login')
    const toastMessage = page.getByText(
      'A link to reset your password was sent to admin@example.com'
    )
    expect(toastMessage)
  })
})
