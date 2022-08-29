import { db } from 'src/lib/db'

import { users, user, createUser, updateUser, deleteUser } from './users'
import type { InUseScenario, StandardScenario } from './users.scenarios'

describe('users', () => {
  scenario('returns all users', async (scenario: StandardScenario) => {
    const result = await users()

    expect(result.length).toEqual(Object.keys(scenario.user).length)
  })

  scenario('returns a single user', async (scenario: StandardScenario) => {
    const result = await user({ id: scenario.user.one.id })

    expect(result).toEqual(scenario.user.one)
  })

  describe('creates', () => {
    scenario('when no teams', async () => {
      const before = new Date()
      const result = await createUser({
        input: {
          active: true,
          admin: false,
          email: 'String4652567',
        },
      })

      expect(result.active).toEqual(true)
      expect(result.admin).toEqual(false)
      expect(result.email).toEqual('String4652567')
      expect(result.hashedPassword).toBeTruthy()
      expect(result.salt).toBeTruthy()
      expect(result.createdAt.getTime()).toBeGreaterThan(before.getTime())
      expect(result.updatedAt.getTime()).toBeGreaterThan(before.getTime())
    })

    scenario('inUse', 'when adding teams', async (scenario: InUseScenario) => {
      const result = await createUser({
        input: {
          active: true,
          admin: false,
          email: 'String4652567',
          teamIds: [scenario.team.team1.id],
        },
      })

      const membership = await db.membership.findUnique({
        where: {
          userTeamConstraint: {
            teamId: scenario.team.team1.id,
            userId: result.id,
          },
        },
      })

      expect(membership).not.toEqual(null)
    })
  })

  describe('updates', () => {
    scenario('inUse', 'when no teams', async (scenario: InUseScenario) => {
      const original = await user({ id: scenario.user.notInUseUser.id })
      const before = new Date()
      const result = await updateUser({
        id: original.id,
        input: { email: 'String61961682' },
      })

      expect(result.email).toEqual('String61961682')
      expect(result.createdAt.getTime()).toBeLessThan(before.getTime())
      expect(result.updatedAt.getTime()).toBeGreaterThan(before.getTime())
    })

    scenario('inUse', 'when adding teams', async (scenario: InUseScenario) => {
      const original = await user({ id: scenario.user.notInUseUser.id })

      const result = await updateUser({
        id: original.id,
        input: { teamIds: [scenario.team.team1.id] },
      })

      const membership = await db.membership.findUnique({
        where: {
          userTeamConstraint: {
            teamId: scenario.team.team1.id,
            userId: result.id,
          },
        },
      })

      expect(membership).not.toEqual(null)
    })

    scenario('inUse', 'when remove a team', async (scenario: InUseScenario) => {
      const original = await user({ id: scenario.user.inUseUser.id })

      const result = await updateUser({
        id: original.id,
        input: { teamIds: [] },
      })

      const membership = await db.membership.findUnique({
        where: {
          userTeamConstraint: {
            teamId: scenario.team.team1.id,
            userId: result.id,
          },
        },
      })

      expect(membership).toEqual(null)
    })
  })

  scenario('deletes a user', async (scenario: StandardScenario) => {
    const original = await deleteUser({ id: scenario.user.one.id })
    const result = await user({ id: original.id })

    expect(result).toEqual(null)
  })
})
