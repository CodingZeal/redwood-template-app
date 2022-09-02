import { roles, role, createRole, updateRole, deleteRole } from './roles'
import type { InUseScenario, StandardScenario } from './roles.scenarios'

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
    expect(result.createdAt.getTime()).toBeLessThan(before.getTime())
    expect(result.updatedAt.getTime()).toBeGreaterThan(before.getTime())
  })

  describe('deletes', () => {
    scenario('inUse', 'unused role', async (scenario: InUseScenario) => {
      const original = await deleteRole({ id: scenario.role.notInUseRole.id })
      const result = await role({ id: original.id })

      expect(result).toEqual(null)
    })

    scenario('inUse', 'role in use', async (scenario: InUseScenario) => {
      expect(deleteRole({ id: scenario.role.inUseRole.id })).rejects.toThrow(
        Error('Role is in use, please remove memberships before deletion')
      )

      const result = await role({ id: scenario.role.inUseRole.id })
      expect(result).toEqual(scenario.role.inUseRole)
    })
  })
})
