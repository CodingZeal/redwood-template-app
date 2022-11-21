import { test, expect } from '@playwright/test'

import { LoginPageModel } from './poms/LoginPagePom'

const MOCK_PROFILE = {
  name: 'snap',
  nickname: 'crackle',
  pronouns: 'cereal',
}

const MOCK_USER_EMAIL = 'snap@crackle.com'

test.describe('edit profile', () => {
  let loginPage: LoginPageModel

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPageModel(page)
    await loginPage.loginBasicUser(MOCK_USER_EMAIL)
    await page.goto('/profile')
    await page.waitForSelector('#edit-profile')
  })

  test.afterEach(async () => {
    await loginPage.reset()
  })

  test('should save profile changes', async ({ page }) => {
    const nameInput = page.locator('input[name="name"]')
    const nicknameInput = page.locator('input[name="nickname"]')
    const emailInput = page.locator('input[name="email"]')
    const pronounsInput = page.locator('input[name="pronouns"]')
    const saveButton = page.locator('text=Save')

    expect(await emailInput.inputValue()).toEqual(MOCK_USER_EMAIL)

    await nameInput.click()
    await nameInput.fill(MOCK_PROFILE.name)

    await nicknameInput.click()
    await nicknameInput.fill(MOCK_PROFILE.nickname)

    await pronounsInput.click()
    await pronounsInput.fill(MOCK_PROFILE.pronouns)

    await saveButton.click()
    await page.waitForURL('/profile')
    expect(await nameInput.inputValue()).toEqual(MOCK_PROFILE.name)
    expect(await nicknameInput.inputValue()).toEqual(MOCK_PROFILE.nickname)
    expect(await pronounsInput.inputValue()).toEqual(MOCK_PROFILE.pronouns)
  })

  test('should update profile name in navigation', async ({ page }) => {
    const profileLink = page.locator(`a >> text=${MOCK_USER_EMAIL}`)
    expect(profileLink).toHaveText(MOCK_USER_EMAIL)

    const nameInput = page.locator('input[name="name"]')
    await nameInput.click()
    await nameInput.fill(MOCK_PROFILE.name)

    const saveButton = page.locator('text=Save')
    await saveButton.click()

    const profileLinkWithNewName = page.locator(
      `a >> text=${MOCK_PROFILE.name}`
    )
    expect(profileLinkWithNewName).toHaveText(MOCK_PROFILE.name)

    const nickNameInput = page.locator('input[name="nickname"]')
    await nickNameInput.click()
    await nameInput.fill(MOCK_PROFILE.name)
    await saveButton.click()

    const profileLinkWithNewNickName = page.locator(
      `a >> text=${MOCK_PROFILE.name}`
    )
    expect(profileLinkWithNewNickName).toHaveText(MOCK_PROFILE.name)
  })
})
