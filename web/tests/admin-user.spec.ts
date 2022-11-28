import { test, expect } from '@playwright/test'

import { db } from '../../api/src/lib/db'

const MOCK_USER = {
  email: 'cereal@example.com',
  name: 'SnapCracklePop',
  nickname: 'waffleCrisp',
  pronouns: 'cheerios',
}

const NEW_MOCK_INFO = {
  name: 'Harry Potter',
  nickname: 'Chosen One',
  pronouns: 'he/him',
}

test.use({ storageState: 'web/tests/storage/adminUser-pw.json' })
test.beforeEach(async ({ page }) => {
  await page.goto('/')

  const admin = page.getByText('Admin').first()
  expect(admin)

  await admin.click()
  await page.waitForURL('/admin/users')
})

test.describe('admin crud user', async () => {
  test('admin creates a new user', async ({ page }) => {
    const newUser = page.getByText('New User').first()
    expect(newUser)
    await newUser.click()

    await page.waitForURL('/admin/users/new')

    const emailInput = page.locator('input[name="email"]')
    await emailInput.click()
    await emailInput.fill(MOCK_USER.email)

    const nameInput = page.locator('input[name="name"]')
    await nameInput.click()
    await nameInput.fill(MOCK_USER.name)

    const nicknameInput = page.locator('input[name="nickname"]')
    await nicknameInput.click()
    await nicknameInput.fill(MOCK_USER.nickname)

    const pronounsInput = page.locator('input[name="pronouns"]')
    await pronounsInput.click()
    await pronounsInput.fill(MOCK_USER.pronouns)

    await page.getByLabel('Active').check()
    expect(page.getByLabel('Active').isChecked()).toBeTruthy()

    const saveButton = page.getByRole('button', { name: 'Save' })
    await saveButton.click()

    await page.waitForURL('/admin/users')

    const newUserToast = page.getByText('User created')
    expect(newUserToast)

    const newUserList = page.getByText(MOCK_USER.email)
    expect(newUserList)
  })

  test('admin shows a user', async ({ page }) => {
    const newlyCreatedUser = await db.user.findUnique({
      where: { email: MOCK_USER.email },
    })
    await page.goto(`/admin/users/${newlyCreatedUser?.id}`)

    const mockEmail = page.getByText(MOCK_USER.email)
    expect(mockEmail)

    const mockName = page.getByText(MOCK_USER.name)
    expect(mockName)

    const mockNickname = page.getByText(MOCK_USER.nickname)
    expect(mockNickname)

    const mockPronouns = page.getByText(MOCK_USER.pronouns)
    expect(mockPronouns)
  })

  test('admin edits a user', async ({ page }) => {
    const newlyCreatedUser = await db.user.findUnique({
      where: { email: MOCK_USER.email },
    })
    await page.goto(`/admin/users/${newlyCreatedUser?.id}/edit`)

    const nameInput = page.locator('input[name="name"]')
    await nameInput.click()
    await nameInput.fill(NEW_MOCK_INFO.name)

    const nicknameInput = page.locator('input[name="nickname"]')
    await nicknameInput.click()
    await nicknameInput.fill(NEW_MOCK_INFO.nickname)

    const pronounsInput = page.locator('input[name="pronouns"]')
    await pronounsInput.click()
    await pronounsInput.fill(NEW_MOCK_INFO.pronouns)

    const saveButton = page.getByRole('button', { name: 'Save' })
    await saveButton.click()

    await page.waitForURL('/admin/users')

    await page.goto(`/admin/users/${newlyCreatedUser?.id}`)

    const mockName = page.getByText(NEW_MOCK_INFO.name)
    expect(mockName)

    const mockNickname = page.getByText(NEW_MOCK_INFO.nickname)
    expect(mockNickname)

    const mockPronouns = page.getByText(NEW_MOCK_INFO.pronouns)
    expect(mockPronouns)
  })

  test('admin removes a user', async ({ page }) => {
    const newlyCreatedUser = await db.user.findUnique({
      where: { email: MOCK_USER.email },
    })
    await page.goto(`/admin/users/${newlyCreatedUser?.id}`)

    page.once('dialog', (dialog) => {
      dialog.accept().catch(() => {})
    })
    await page.getByText('Remove').click()

    const toastMessage = page.getByText('User Removed')
    expect(toastMessage)

    await page.waitForURL('/admin/users')

    const removedEmail = page.getByText(MOCK_USER.email)
    await expect(removedEmail).not.toBeVisible()
  })

  test('admin archives a user', async ({ page }) => {
    page.once('dialog', (dialog) => {
      dialog.accept().catch(() => {})
    })
    await page.locator('text=Archive').first().click()

    const toastMessage = page.getByText('User updated')
    expect(toastMessage)

    const reactivateMessage = page.getByText('Reactivate')
    expect(reactivateMessage)

    page.once('dialog', (dialog) => {
      dialog.accept().catch(() => {})
    })
    await reactivateMessage.first().click()

    const updatedMessage = page.getByText('User updated')
    expect(updatedMessage)

    await expect(reactivateMessage).not.toBeVisible()
  })
})
