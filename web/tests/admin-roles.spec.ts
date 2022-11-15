import { test, expect } from '@playwright/test'

import { db } from '../../api/src/lib/db'

const MOCK_ROLE = {
  name: 'SnapCracklePop',
}

const NEW_MOCK_INFO = {
  name: 'Example Role',
}

test.describe('admin crud role', async () => {
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
    const admin = await page.locator('text=Admin').first()
    await expect(admin).toBeVisible()

    await page.locator('text=Admin').first().click()
    await page.waitForURL('/admin/users')

    await page.locator('text=Roles').first().click()
    await page.waitForURL('/admin/roles')
  })

  test('admin creates a new role', async ({ page }) => {
    await page.locator('text=New Role').click()
    await page.waitForURL('/admin/roles/new')
    await page.locator('input[name="name"]').click()
    await page.locator('input[name="name"]').fill(MOCK_ROLE.name)

    await page.locator('button:has-text("Save")').click()
    await page.waitForURL('/admin/roles')
  })

  test('admin shows a role', async ({ page }) => {
    const newlyCreatedRole = await db.role.findFirst({
      where: { name: MOCK_ROLE.name },
    })
    await page.goto(`/admin/roles/${newlyCreatedRole?.id}`)
    const mockName = page.locator(`text=${MOCK_ROLE.name}`)
    await expect(mockName).toBeVisible()
  })

  test('admin edits a role', async ({ page }) => {
    const newlyCreatedRole = await db.role.findFirst({
      where: { name: MOCK_ROLE.name },
    })
    await page.goto(`/admin/roles/${newlyCreatedRole?.id}/edit`)

    await page.locator('input[name="name"]').click()
    await page.locator('input[name="name"]').fill(NEW_MOCK_INFO.name)

    await page.locator('button:has-text("Save")').click()
    await page.waitForURL('/admin/roles')
  })

  test('admin removes a role', async ({ page }) => {
    const deleteCreatedRole = await db.role.findFirst({
      where: { name: NEW_MOCK_INFO.name },
    })
    await page.goto(`/admin/roles/${deleteCreatedRole?.id}`)

    page.once('dialog', (dialog) => {
      dialog.accept().catch(() => {})
    })
    await page.locator('text=Delete').click()

    const toastMessage = await page.locator('text=Role deleted')
    await expect(toastMessage).toBeVisible()
    await page.waitForURL('/admin/roles')
  })
})
