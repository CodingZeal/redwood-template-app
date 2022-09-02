import { act } from 'react-dom/test-utils'

import { useFormContext } from '@redwoodjs/forms'
import { renderHook } from '@redwoodjs/testing/web'

import { useTeamState } from './useTeamState'

jest.mock('@redwoodjs/forms', () => ({
  useFormContext: jest.fn().mockImplementation(() => ({ setValue: jest.fn() })),
}))

const mockUseFormContext = useFormContext as jest.Mock

describe('useTeamState', () => {
  const id1 = 'monkey1'
  const id2 = 'monkey2'
  const id3 = 'monkey3'
  const teams = [
    {
      id: id1,
    },
    {
      id: id2,
    },
    {
      id: id3,
    },
  ]
  const teamIds = [id1, id2]

  beforeEach(() => {
    mockUseFormContext.mockClear()
  })

  it('renders successfully', () => {
    const { result } = renderHook(() =>
      useTeamState({ initialTeamIds: teamIds, teams })
    )
    expect(result.error).toBe(undefined)
  })

  it('sets initial state', () => {
    const {
      result: {
        current: { state },
      },
    } = renderHook(() => useTeamState({ initialTeamIds: teamIds, teams }))

    expect(state.teamToAdd).toBe(null)
    expect(state.teamIds).toEqual(teamIds)
    expect(state.selectedTeams).toEqual([{ id: id1 }, { id: id2 }])
    expect(state.unselectedTeams).toEqual([{ id: id3 }])
  })

  it('selects a team', () => {
    const event = { preventDefault: jest.fn() }
    const { result } = renderHook(() =>
      useTeamState({ initialTeamIds: teamIds, teams })
    )

    act(() => {
      result.current.dispatch({ type: 'ADD_TEAM', id: id3 })
    })
    expect(result.current.state.teamToAdd).toEqual(id3)
    act(() => {
      result.current.addTeam(event)
    })
    expect(result.current.state.teamIds).toEqual([id1, id2, id3])
    expect(result.current.state.selectedTeams).toEqual([
      { id: id1 },
      { id: id2 },
      { id: id3 },
    ])
  })

  it('removes a team', () => {
    const event = { preventDefault: jest.fn(), target: { value: id2 } }
    const { result } = renderHook(() =>
      useTeamState({ initialTeamIds: teamIds, teams })
    )

    act(() => {
      result.current.removeTeam(event)
    })
    expect(result.current.state.teamIds).toEqual([id1])
    expect(result.current.state.selectedTeams).toEqual([{ id: id1 }])
  })
})
