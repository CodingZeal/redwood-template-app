import { test, expect } from '@playwright/test'

import { db } from '../../api/src/lib/db'

const MOCK_ROLE = {
  name: 'SnapCracklePop',
}

const NEW_MOCK_INFO = {
  name: 'Example Role',
}

test.use({ storageState: 'web/tests/storage/adminUser-pw.json' })

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('text=Admin').first()).toBeVisible()

  await page.locator('text=Admin').first().click()
  await page.waitForURL('/admin/users')

  await page.locator('text=Roles').first().click()
  await page.waitForURL('/admin/roles')
})

test.describe('admin crud role', async () => {
  test('admin creates a new role', async ({ page }) => {
    await page.locator('text=New Role').click()
    await page.waitForURL('/admin/roles/new')
    await page.locator('input[name="name"]').click()
    await page.locator('input[name="name"]').fill(MOCK_ROLE.name)

    await page.locator('button:has-text("Save")').click()
    await page.waitForURL('/admin/roles')
    const toastNewRole = page.locator('text=Role created')
    await expect(toastNewRole).toBeVisible()
    const newRoleList = page.locator(`text=${MOCK_ROLE.name}`)
    await expect(newRoleList).toBeVisible()
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

    await page.goto(`/admin/roles/${newlyCreatedRole?.id}`)
    const mockName = page.locator(`text=${NEW_MOCK_INFO.name}`)
    await expect(mockName).toBeVisible()
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
    const removedRole = page.locator(`text=${NEW_MOCK_INFO.name}`)
    await expect(removedRole).not.toBeVisible()
  })
})
