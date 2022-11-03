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
  const admin = await page.locator('text=Admin')
  await expect(admin).toBeVisible()

  await page.locator('text=Admin').click()
  await page.waitForURL('/admin/users')
})

test.describe('admin crud user', () => {
  test('should save profile changes', async ({ page }) => {})

  test('should update profile name in navigation', async ({ page }) => {})
})
