// import { FullConfig } from '@playwright/test'

async function globalSetup() {
  process.env.SESSION_SECRET = 'foobar'
}

export default globalSetup
