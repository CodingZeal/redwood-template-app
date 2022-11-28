import { test, expect } from '@playwright/test'

import { db } from '../../api/src/lib/db'

const MOCK_ROLE = {
  name: 'SnapCracklePop',
}

const NEW_MOCK_INFO = {
  name: 'Example Role',
}

test.use({ storageState: 'web/tests/storage/adminUser-pw.json' })
test.describe('admin crud role', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    const adminLink = page.getByText('Admin').first()
    expect(adminLink)

    await adminLink.click()
    await page.waitForURL('/admin/users')

    await page.getByText('Roles').first().click()
    await page.waitForURL('/admin/roles')
  })

  test('admin creates a new role', async ({ page }) => {
    await page.getByText('New Role').click()
    await page.waitForURL('/admin/roles/new')

    const nameInput = page.locator('input[name="name"]')
    await nameInput.click()
    await nameInput.fill(MOCK_ROLE.name)

    await page.getByRole('button', { name: 'Save' }).click()

    await page.waitForURL('/admin/roles')

    const toastNewRole = page.getByText('Role created')
    expect(toastNewRole)

    const newRoleList = page.getByText(MOCK_ROLE.name).first()
    await expect(newRoleList).toBeVisible()
  })

  test('admin shows a role', async ({ page }) => {
    const newlyCreatedRole = await db.role.findFirst({
      where: { name: MOCK_ROLE.name },
    })
    await page.goto(`/admin/roles/${newlyCreatedRole?.id}`)
    const mockName = page.getByText(MOCK_ROLE.name)
    expect(mockName)
  })

  test('admin edits a role', async ({ page }) => {
    const newlyCreatedRole = await db.role.findFirst({
      where: { name: MOCK_ROLE.name },
    })
    await page.goto(`/admin/roles/${newlyCreatedRole?.id}/edit`)

    const nameInput = page.locator('input[name="name"]')
    await nameInput.click()
    await nameInput.fill(NEW_MOCK_INFO.name)

    await page.getByRole('button', { name: 'Save' }).click()
    await page.waitForURL('/admin/roles')

    await page.goto(`/admin/roles/${newlyCreatedRole?.id}`)

    const mockName = page.getByText(NEW_MOCK_INFO.name)
    expect(mockName)
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

    const toastMessage = page.getByText('Role deleted')
    expect(toastMessage)
    await page.waitForURL('/admin/roles')
    const removedRole = page.getByText(NEW_MOCK_INFO.name)
    await expect(removedRole).not.toBeVisible()
  })
})
