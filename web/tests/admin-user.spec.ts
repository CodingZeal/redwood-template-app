import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
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

  const logout = await page.locator('text=Logout')
  await expect(logout).toBeVisible()
  const admin = await page.locator('text=Admin').first()
  await expect(admin).toBeVisible()

  await page.locator('text=Admin').first().click()
  await page.waitForURL('/admin/users')
})

const MOCK_USER = {
  email: 'endtoend@example.com',
  name: 'E2E',
  nickname: 'E2ENickName',
  pronouns: 'E2EPronouns',
}

test.describe('admin crud user', () => {
  test('admin creates a new user', async ({ page }) => {
    await page.locator('text=New User').click()
    await page.waitForURL('/admin/users/new')
    await page.locator('input[name="email"]').click()
    await page.locator('input[name="email"]').fill(MOCK_USER.email)
    await page.locator('input[name="name"]').click()
    await page.locator('input[name="name"]').fill(MOCK_USER.name)
    await page.locator('input[name="nickname"]').click()
    await page.locator('input[name="nickname"]').fill(MOCK_USER.nickname)
    await page.locator('input[name="pronouns"]').click()
    await page.locator('input[name="pronouns"]').fill(MOCK_USER.pronouns)

    await page.locator('button:has-text("Save")').click()
    await page.waitForURL('/admin/users')
  })
})
