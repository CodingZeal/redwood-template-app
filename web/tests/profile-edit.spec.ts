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

  const logout = await page.locator('[data-testid="logout"]')
  await expect(logout).toHaveText('Logout')

  await page.goto('/profile')
  await page.waitForURL('/profile')
  const profileTitle = await page.locator('.rw-heading-primary')
  await expect(profileTitle).toBeVisible()
  await expect(profileTitle).toHaveText('Profile')
})

test.describe('edit profile', () => {
  test('should save profile changes', async ({ page }) => {
    const initialEmail = await page.locator('input[name="email"]').inputValue()
    await expect(initialEmail).toEqual('admin@example.com')

    await page.locator('input[name="name"]').click()
    await page.locator('input[name="name"]').fill('e2e-NAME')
    await page.locator('input[name="nickname"]').click()
    await page.locator('input[name="nickname"]').fill('e2e-NICKNAME')
    await page.locator('input[name="pronouns"]').click()
    await page.locator('input[name="pronouns"]').fill('e2e-PRONOUNS')
    await page.locator('input[name="email"]').click()
    await page.locator('input[name="email"]').fill('e2e@example.com')
    await page.locator('text=Save').click()
    await page.waitForURL('/')

    await page.goto('/profile')
    await page.waitForURL('/profile')

    const name = await page.locator('input[name="name"]').inputValue()
    await expect(name).toEqual('e2e-NAME')
    const nickname = await page.locator('input[name="nickname"]').inputValue()
    await expect(nickname).toEqual('e2e-NICKNAME')
    const pronouns = await page.locator('input[name="pronouns"]').inputValue()
    await expect(pronouns).toEqual('e2e-PRONOUNS')
    const email = await page.locator('input[name="email"]').inputValue()
    await expect(email).toEqual('e2e@example.com')

    await page.locator('input[name="name"]').click()
    await page.locator('input[name="name"]').fill('')
    await page.locator('input[name="nickname"]').click()
    await page.locator('input[name="nickname"]').fill('')
    await page.locator('input[name="pronouns"]').click()
    await page.locator('input[name="pronouns"]').fill('')
    await page.locator('input[name="email"]').click()
    await page.locator('input[name="email"]').fill('admin@example.com')
    await page.locator('text=Save').click()
    await page.waitForURL('/')
  })

  test('should update profile name in navigation', async ({ page }) => {
    await page.locator('input[name="nickname"]').click()
    await page.locator('input[name="nickname"]').fill('e2e-nick-name')
    await page.locator('text=Save').click()
    await page.waitForURL('/')

    const profileLinkNickname = await page.locator('text=e2e-nick-name')
    await expect(profileLinkNickname).toBeVisible()
    await profileLinkNickname.click()
    await page.waitForURL('/profile')

    await page.locator('input[name="nickname"]').click()
    await page.locator('input[name="nickname"]').fill('')
    await page.locator('text=Save').click()
    await page.waitForURL('/')

    const profileLinkEmail = await page.locator('text=admin@example.com')
    await expect(profileLinkEmail).toBeVisible()
  })
})
