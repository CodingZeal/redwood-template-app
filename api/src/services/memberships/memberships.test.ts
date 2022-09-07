import { memberships, membership } from './memberships'
import type { StandardScenario } from './memberships.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('memberships', () => {
  scenario('returns all memberships', async (scenario: StandardScenario) => {
    const result = await memberships()

    expect(result.length).toEqual(Object.keys(scenario.membership).length)
  })

  scenario(
    'returns a single membership',
    async (scenario: StandardScenario) => {
      const result = await membership({ id: scenario.membership.one.id })

      expect(result).toEqual(scenario.membership.one)
    }
  )
})
