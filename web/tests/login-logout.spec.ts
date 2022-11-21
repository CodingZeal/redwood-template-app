import { test, expect } from '@playwright/test'

test.describe('login as a user', () => {
  test('should login user', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('link', { name: 'Login' }).click()
    await expect(page).toHaveURL('/login')

    await page.getByLabel('Username').click()

    await page.getByLabel('Username').fill('admin@example.com')
    await page.getByLabel('Password').click()
    await page.getByLabel('Password').fill('password')

    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page).toHaveURL('/')

    await page.getByRole('button', { name: 'Logout' }).click()
    const loginLink = page.getByRole('link', { name: 'Login' })
    await expect(loginLink).toBeVisible()
  })
})
