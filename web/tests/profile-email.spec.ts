import { test, expect } from '@playwright/test'

const MOCK_PROFILE = {
  password: 'password',
  newEmail: 'lucky@charms.com',
}

test.use({ storageState: 'web/tests/storage/basicUser-pw.json' })

test.describe('edit profile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    await page.goto('/profile/edit_email', { waitUntil: 'domcontentloaded' })
    await page.waitForSelector('#edit-email')
  })

  test('should save email update', async ({ page }) => {
    const passwordInput = page.locator('input[name="password"]')
    const newEmailInput = page.locator('input[name="newEmail"]')
    const saveButton = page.locator('text=Update Email')

    await passwordInput.click()
    await passwordInput.fill(MOCK_PROFILE.password)

    await newEmailInput.click()
    await newEmailInput.fill(MOCK_PROFILE.newEmail)

    await saveButton.click()
    await page.waitForURL('/profile/edit_email', {
      waitUntil: 'domcontentloaded',
    })
    expect(await passwordInput.inputValue()).toEqual(MOCK_PROFILE.password)
    expect(await newEmailInput.inputValue()).toEqual(MOCK_PROFILE.newEmail)

    const toastMessage = page.getByText(
      `We have sent an email to: ${MOCK_PROFILE.newEmail}. Please check your email for this message and verify your change by clicking on the verification link.`
    )
    expect(toastMessage)
  })
})
