import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'

const LOCAL_WORKERS = 1

const config: PlaywrightTestConfig = {
  globalSetup: require.resolve('./playwright.setup.ts'),
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : LOCAL_WORKERS,
  reporter: 'html',
  use: {
    actionTimeout: 15 * 1000,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
  webServer: {
    reuseExistingServer: true,
    command: 'yarn rw serve',
    port: 8910,
    env: {
      DISABLE_EMAIL: 'true',
    },
  },
}

export default config
