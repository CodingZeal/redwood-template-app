import { test, expect } from '@playwright/test'

// test.beforeEach(async ({ page }) => {
//   await page.addInitScript(() => {
//     const mockToken = {
//       validateResetToken: 'testToken',
//       addEventListener: () => {},
//     }
//   })
// })

test.describe('reset password', () => {
  test('user should fill out new password input', async ({ page }) => {
    await page.route('/reset-password?resetToken=testToken', (route) =>
      route.fulfill({ path: 'mock_data.json' })
    )
    // await page.goto('/reset-password?resetToken=testToken')

    const resetPasswordTitle = await page.locator('.rw-heading-secondary')
    await expect(resetPasswordTitle).toBeVisible()
    await expect(resetPasswordTitle).toHaveText('Reset Password')

    await page.locator('input[name=password]').click()
    await page.locator('input[name=password]').fill('example password')

    await page.locator('text=Submit').click()
    await page.waitForURL('/login')
    const toastMessage = await page.locator('text=Password changed!')
    await expect(toastMessage).toBeVisible()
  })
})
