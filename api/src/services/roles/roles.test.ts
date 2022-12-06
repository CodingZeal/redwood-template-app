import { ValidationError } from '@redwoodjs/graphql-server'

import { roles, role, createRole, updateRole, deleteRole } from './roles'
import type { AssociationsScenario, StandardScenario } from './roles.scenarios'

describe('roles', () => {
  scenario('returns all roles', async (scenario: StandardScenario) => {
    const result = await roles()

    expect(result.length).toEqual(Object.keys(scenario.role).length)
  })

  scenario('returns a single role', async (scenario: StandardScenario) => {
    const result = await role({ id: scenario.role.one.id })

    expect(result).toEqual(scenario.role.one)
  })

  scenario('creates a role', async () => {
    const before = new Date()
    const result = await createRole({
      input: { name: 'NEW-role' },
    })

    expect(result.name).toEqual('NEW-role')
    expect(result.createdAt.getTime()).toBeGreaterThanOrEqual(before.getTime())
    expect(result.updatedAt.getTime()).toBeGreaterThanOrEqual(before.getTime())
  })

  scenario('updates a role', async (scenario: StandardScenario) => {
    const original = await role({ id: scenario.role.one.id })
    const before = new Date()
    const result = await updateRole({
      id: original.id,
      input: { name: 'UPDATED' },
    })

    expect(result.name).toEqual('UPDATED')
    expect(result.createdAt.getTime()).toBeLessThanOrEqual(before.getTime())
    expect(result.updatedAt.getTime()).toBeGreaterThanOrEqual(before.getTime())
  })

  describe('deletes', () => {
    scenario(
      'associations',
      'when no users',
      async (scenario: AssociationsScenario) => {
        const original = await deleteRole({ id: scenario.role.withoutUser.id })
        const result = await role({ id: original.id })

        expect(result).toEqual(null)
      }
    )

    scenario(
      'associations',
      'when has users',
      async (scenario: AssociationsScenario) => {
        await expect(
          deleteRole({ id: scenario.role.withUser.id })
        ).rejects.toThrow(
          new ValidationError(
            'Role is in use, please remove memberships before deletion'
          )
        )

        const result = await role({ id: scenario.role.withUser.id })
        expect(result).toEqual(scenario.role.withUser)
      }
    )
  })
})
