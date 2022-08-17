import {
  membershipRoles,
  membershipRole,
  createMembershipRole,
  updateMembershipRole,
  deleteMembershipRole,
} from './membershipRoles'
import type { StandardScenario } from './membershipRoles.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('membershipRoles', () => {
  scenario(
    'returns all membershipRoles',
    async (scenario: StandardScenario) => {
      const result = await membershipRoles()

      expect(result.length).toEqual(Object.keys(scenario.membershipRole).length)
    }
  )

  scenario(
    'returns a single membershipRole',
    async (scenario: StandardScenario) => {
      const result = await membershipRole({
        id: scenario.membershipRole.one.id,
      })

      expect(result).toEqual(scenario.membershipRole.one)
    }
  )

  scenario('creates a membershipRole', async (scenario: StandardScenario) => {
    const result = await createMembershipRole({
      input: {
        membershipId: scenario.membershipRole.two.membershipId,
        roleId: scenario.membershipRole.two.roleId,
      },
    })

    expect(result.membershipId).toEqual(
      scenario.membershipRole.two.membershipId
    )
    expect(result.roleId).toEqual(scenario.membershipRole.two.roleId)
  })

  scenario('updates a membershipRole', async (scenario: StandardScenario) => {
    const original = await membershipRole({
      id: scenario.membershipRole.one.id,
    })
    const result = await updateMembershipRole({
      id: original.id,
      input: { membershipId: scenario.membershipRole.two.membershipId },
    })

    expect(result.membershipId).toEqual(
      scenario.membershipRole.two.membershipId
    )
  })

  scenario('deletes a membershipRole', async (scenario: StandardScenario) => {
    const original = await deleteMembershipRole({
      id: scenario.membershipRole.one.id,
    })
    const result = await membershipRole({ id: original.id })

    expect(result).toEqual(null)
  })
})
