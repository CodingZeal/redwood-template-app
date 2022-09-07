import { membershipRoles, membershipRole } from './membershipRoles'
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
})
