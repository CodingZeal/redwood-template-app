import { ValidationError } from '@redwoodjs/graphql-server'

import { teams, team, createTeam, updateTeam, deleteTeam } from './teams'
import type { AssociationsScenario, StandardScenario } from './teams.scenarios'

describe('teams', () => {
  scenario('returns all teams', async (scenario: StandardScenario) => {
    const result = await teams()

    expect(result.length).toEqual(Object.keys(scenario.team).length)
  })

  scenario('returns a single team', async (scenario: StandardScenario) => {
    const result = await team({ id: scenario.team.one.id })

    expect(result).toEqual(scenario.team.one)
  })

  scenario('creates a team', async () => {
    const before = new Date()
    const result = await createTeam({
      input: { name: 'String', active: true },
    })

    expect(result.name).toEqual('String')
    expect(result.active).toEqual(true)
    expect(result.createdAt.getTime()).toBeGreaterThanOrEqual(before.getTime())
    expect(result.updatedAt.getTime()).toBeGreaterThanOrEqual(before.getTime())
  })

  scenario('updates a team', async (scenario: StandardScenario) => {
    const original = await team({ id: scenario.team.one.id })
    const before = new Date()
    const result = await updateTeam({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
    expect(result.createdAt.getTime()).toBeLessThanOrEqual(before.getTime())
    expect(result.updatedAt.getTime()).toBeGreaterThanOrEqual(before.getTime())
  })

  describe('deletes', () => {
    scenario('unused', async (scenario: StandardScenario) => {
      const original = await deleteTeam({ id: scenario.team.one.id })
      const result = await team({ id: original.id })

      expect(result).toEqual(null)
    })

    scenario(
      'associations',
      'when has users',
      async (scenario: AssociationsScenario) => {
        await expect(
          deleteTeam({ id: scenario.team.withUser.id })
        ).rejects.toThrow(
          new ValidationError('Please remove users before deleting team')
        )

        const result = await team({ id: scenario.team.withUser.id })

        expect(result).not.toEqual(null)
      }
    )
  })
})
