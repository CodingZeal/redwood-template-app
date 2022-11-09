import { chromium } from '@playwright/test'

import { db } from '../api/src/lib/db'
import { hashPassword } from '../scripts/seed'

async function globalSetup() {
  const browser = await chromium.launch()
  const adminLogin = await browser.newPage()
  await adminLogin.goto('http://localhost:8910/login')
  await adminLogin.locator('input[name="username"]').click()
  await adminLogin.locator('input[name="username"]').fill('admin@example.com')
  await adminLogin.locator('input[name="password"]').click()
  await adminLogin.locator('input[name="password"]').fill('password')
  await adminLogin.locator('button:has-text("Login")').click()
  await adminLogin.context().storageState({ path: 'adminUser.json' })

  const userLogin = await browser.newPage()
  await userLogin.goto('http://localhost:8910/login')
  await userLogin.locator('input[name="username"]').click()
  await userLogin.locator('input[name="username"]').fill('user@example.com')
  await userLogin.locator('input[name="password"]').click()
  await userLogin.locator('input[name="password"]').fill('password')
  await userLogin.locator('button:has-text("Login")').click()
  await userLogin.context().storageState({ path: 'basicUser.json' })

  await browser.close()
}
export interface IUser {
  email: string
  hashedPassword?: string
  salt?: string
  role?: string
  resetToken?: string
  resetTokenExpiresAt?: Date
  verifyToken?: string
}
export class MockUserEntity {
  static remove(email: string) {
    return db.user.delete({
      where: {
        email,
      },
    })
  }
  static findByEmail(email: string) {
    return db.user.findUnique({
      where: {
        email,
      },
    })
  }
  static upsert(data: IUser) {
    const [hashedPassword, salt] = hashPassword('password')
    return db.user.upsert({
      where: {
        email: data.email,
      },
      update: {
        ...data,
        hashedPassword,
        salt,
      },
      create: {
        ...data,
        hashedPassword,
        salt,
      },
    })
  }
}

export default globalSetup
