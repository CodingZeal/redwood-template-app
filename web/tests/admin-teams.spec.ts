import { test, expect } from '@playwright/test'

import { db } from '../../api/src/lib/db'

const MOCK_TEAM = {
  name: 'Cheerios',
}

const NEW_MOCK_INFO = {
  name: 'Example Team',
}

test.use({ storageState: 'web/tests/storage/adminUser-pw.json' })

test.beforeEach(async ({ page }) => {
  await page.goto('/')

  const adminLink = page.getByText('Admin').first()
  expect(adminLink)
  adminLink.click()

  await page.waitForURL('/admin/users')

  await page.getByText('Teams').first().click()
  await page.waitForURL('/admin/teams')
})

test.describe('admin crud team', async () => {
  test('admin creates a new team', async ({ page }) => {
    await page.getByText('New Team').click()
    await page.waitForURL('/admin/teams/new')
    const nameInput = page.locator('input[name="name"]')
    await nameInput.click()
    await nameInput.fill(MOCK_TEAM.name)

    await page.getByRole('button', { name: 'Save' }).click()

    await page.waitForURL('/admin/teams')
    const toastNewTeam = page.getByText('Team created')
    expect(toastNewTeam)

    const newTeamList = page.getByText(MOCK_TEAM.name)
    expect(newTeamList)
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

    const nameInput = page.locator('input[name="name"]')
    await nameInput.click()
    await nameInput.fill(NEW_MOCK_INFO.name)

    const checkInput = page.getByLabel('Active')
    await checkInput.check()
    expect(await checkInput.isChecked())

    await page.getByRole('button', { name: 'Save' }).click()
    await page.waitForURL('/admin/teams')

    await page.goto(`/admin/teams/${newlyCreatedTeam?.id}`)
    const mockName = page.getByText(NEW_MOCK_INFO.name)
    expect(mockName)
  })

  test('admin removes a team', async ({ page }) => {
    const deleteCreatedTeam = await db.team.findFirst({
      where: { name: NEW_MOCK_INFO.name },
    })
    await page.goto(`/admin/teams/${deleteCreatedTeam?.id}`)

    page.once('dialog', (dialog) => {
      dialog.accept().catch(() => {})
    })

    await page.getByText('Delete').click()
    const toastMessage = page.getByText('Team deleted')
    expect(toastMessage)

    await page.waitForURL('/admin/teams')
    const removedTeam = page.getByText(NEW_MOCK_INFO.name)
    await expect(removedTeam).not.toBeVisible()
  })

  test('admin to delete active team error', async ({ page }) => {
    const showButton = page.getByText('Show').first()

    await showButton.click()

    page.once('dialog', (dialog) => {
      dialog.accept().catch(() => {})
    })
    await page.getByText('Delete').first().click()
    const toastMessage = page.getByText(
      'Please remove users before deleting team'
    )
    expect(toastMessage)
  })
})
