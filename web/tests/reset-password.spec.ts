import { test, expect } from '@playwright/test'

import { MockUserEntity } from './entities/user.entity'

test.beforeAll(async () => {
  await MockUserEntity.upsert({
    email: 'snap@crackle.pop',
    resetToken: 'waffleCrisp',
    resetTokenExpiresAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    verifyToken: 'cheerios',
  })
})

test.describe('reset password', () => {
  test('user should fill out new password input', async ({ page }) => {
    await page.goto('/reset-password?resetToken=waffleCrisp')
    await page.locator('input[name="password"]').fill('newpassword')
    await page.getByText('Submit').click()
    await page.waitForURL('/login')
    const toastMessage = page.getByText('Password changed!')
    expect(toastMessage)
  })
})
