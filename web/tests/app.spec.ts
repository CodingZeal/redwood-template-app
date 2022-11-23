import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test.describe('home page', () => {
  test('should load home page', async ({ page }) => {
    const rootElement = page.locator('#redwood-app')
    await expect(rootElement).toBeVisible()
  })
})
