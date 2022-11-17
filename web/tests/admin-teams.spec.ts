import { test, expect } from '@playwright/test'

import { db } from '../../api/src/lib/db'

const MOCK_TEAM = {
  name: 'Cheerios',
}

const NEW_MOCK_INFO = {
  name: 'Example Team',
}

test.use({ storageState: 'web/tests/storage/adminUser-pw.json' })

test.describe('admin crud team', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Admin').first()).toBeVisible()

    await page.locator('text=Admin').first().click()
    await page.waitForURL('/admin/users')

    await page.locator('text=Teams').first().click()
    await page.waitForURL('/admin/teams')
  })

  test('admin creates a new team', async ({ page }) => {
    await page.locator('text=New Team').click()
    await page.waitForURL('/admin/teams/new')
    await page.locator('input[name="name"]').click()
    await page.locator('input[name="name"]').fill(MOCK_TEAM.name)

    await page.locator('button:has-text("Save")').click()
    await page.waitForURL('/admin/teams')
    const toastNewTeam = page.locator('text=Team created')
    await expect(toastNewTeam).toBeVisible()
    const newTeamList = page.locator(`text=${MOCK_TEAM.name}`)
    await expect(newTeamList).toBeVisible()
  })

  test('admin shows a team', async ({ page }) => {
    const newlyCreatedTeam = await db.team.findFirst({
      where: { name: MOCK_TEAM.name },
    })
    await page.goto(`/admin/teams/${newlyCreatedTeam?.id}`)
    const mockName = page.locator(`text=${MOCK_TEAM.name}`)
    await expect(mockName).toBeVisible()
  })

  test('admin edits a team', async ({ page }) => {
    const newlyCreatedTeam = await db.team.findFirst({
      where: { name: MOCK_TEAM.name },
    })
    await page.goto(`/admin/teams/${newlyCreatedTeam?.id}/edit`)

    await page.locator('input[name="name"]').click()
    await page.locator('input[name="name"]').fill(NEW_MOCK_INFO.name)

    await page.getByLabel('Active').check()
    expect(await page.getByLabel('Active').isChecked()).toBeTruthy()

    await page.locator('button:has-text("Save")').click()
    await page.waitForURL('/admin/teams')

    await page.goto(`/admin/teams/${newlyCreatedTeam?.id}`)
    const mockName = page.locator(`text=${NEW_MOCK_INFO.name}`)
    await expect(mockName).toBeVisible()
  })

  test('admin removes a team', async ({ page }) => {
    const deleteCreatedTeam = await db.team.findFirst({
      where: { name: NEW_MOCK_INFO.name },
    })
    await page.goto(`/admin/teams/${deleteCreatedTeam?.id}`)

    page.once('dialog', (dialog) => {
      dialog.accept().catch(() => {})
    })
    await page.locator('text=Delete').click()

    const toastMessage = await page.locator('text=Team deleted')
    await expect(toastMessage).toBeVisible()
    await page.waitForURL('/admin/teams')
    const removedTeam = page.locator(`text=${NEW_MOCK_INFO.name}`)
    await expect(removedTeam).not.toBeVisible()
  })

  test('admin to delete active team error', async ({ page }) => {
    await page.locator('text=Show').first().click()

    page.once('dialog', (dialog) => {
      dialog.accept().catch(() => {})
    })
    await page.locator('text=Delete').click()
    const toastMessage = page.locator(
      'text=Please remove users before deleting team'
    )
    await expect(toastMessage).toBeVisible()
  })
})
