import { test, expect } from '@playwright/test'

test.describe('login as a user', () => {
  test('should login user', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('link', { name: 'Login' }).click()
    await expect(page).toHaveURL('/login')

    const userNameInput = page.getByLabel('Username')
    await userNameInput.click()
    await userNameInput.fill('admin@example.com')

    const passwordInput = page.getByLabel('Password')
    await passwordInput.click()
    await passwordInput.fill('password')

    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page).toHaveURL('/')

    await page.getByRole('button', { name: 'Logout' }).click()
    const loginLink = page.getByRole('link', { name: 'Login' })
    await expect(loginLink).toBeVisible()
  })
})
