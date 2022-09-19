import { db } from 'src/lib/db'

import { profile, updateProfile } from './profile'
import type { StandardScenario } from './profile.scenarios'

describe('profile', () => {
  scenario('returns user profile', async (scenario: StandardScenario) => {
    mockCurrentUser({ id: scenario.user.profile.id })
    const result = await profile({ id: scenario.user.profile.id })

    expect(result).toEqual(scenario.user.profile)
  })

  scenario('updates user profile', async (scenario: StandardScenario) => {
    mockCurrentUser({ id: scenario.user.profile.id })
    const before = new Date()
    const result = await updateProfile({
      input: { email: 'String61961682' },
    })

    expect(result.email).toEqual('String61961682')

    const user = await db.user.findUnique({
      where: { id: scenario.user.profile.id },
    })

    expect(user.email).toEqual('String61961682')
    expect(user.createdAt.getTime()).toBeLessThan(before.getTime())
    expect(user.updatedAt.getTime()).toBeGreaterThan(before.getTime())
  })
})
