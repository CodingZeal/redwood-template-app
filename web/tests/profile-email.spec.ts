import { test, expect } from '@playwright/test'

import { LoginPageModel } from './poms/LoginPagePom'

const MOCK_PROFILE = {
  password: 'password',
  newEmail: 'lucky@charms.com',
}

const MOCK_USER_EMAIL = 'snap@crackle.com'

test.describe('edit profile', () => {
  let loginPage: LoginPageModel

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPageModel(page)
    await loginPage.loginBasicUser(MOCK_USER_EMAIL)
    await page.goto('/profile/edit_email', { waitUntil: 'domcontentloaded' })
    await page.waitForSelector('#edit-email')
  })

  test.afterEach(async () => {
    await loginPage.reset()
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
