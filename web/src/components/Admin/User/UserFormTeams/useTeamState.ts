import { useEffect, useReducer } from 'react'

import { useFormContext } from '@redwoodjs/forms'

const partition = (teams, selectedTeamIds) =>
  teams.reduce(
    (partitioned, team) =>
      selectedTeamIds.includes(team.id)
        ? {
            ...partitioned,
            selectedTeams: [...partitioned.selectedTeams, team],
          }
        : {
            ...partitioned,
            unselectedTeams: [...partitioned.unselectedTeams, team],
          },
    { selectedTeams: [], unselectedTeams: [] }
  )

type StateActionType = 'SELECT' | 'UNSELECT' | 'ADD_TEAM'

const reducer =
  (teams) => (state, action: { id: string; type: StateActionType }) => {
    const newTeamIds = (() => {
      switch (action.type) {
        case 'SELECT':
          return [...state.teamIds, action.id]
        case 'UNSELECT':
          return state.teamIds.filter((teamId) => teamId !== action.id)
        default:
          return state.teamIds
      }
    })()

    return {
      ...partition(teams, newTeamIds),
      teamIds: newTeamIds,
      teamToAdd: action.type === 'ADD_TEAM' ? action.id : state.teamToAdd,
    }
  }

const useTeamState = ({ initialTeamIds, teams }) => {
  const { setValue } = useFormContext()
  const [state, dispatch] = useReducer(reducer(teams), {
    ...partition(teams, initialTeamIds),
    teamIds: initialTeamIds,
    teamToAdd: null,
  })

  useEffect(() => {
    setValue('teamIds', state.teamIds)
  }, [setValue, state])

  const addTeam = (e) => {
    dispatch({ type: 'SELECT', id: state.teamToAdd })
    dispatch({ type: 'ADD_TEAM', id: null })
    e.preventDefault()
  }

  const removeTeam = (e) => {
    dispatch({ type: 'UNSELECT', id: e.target.value })
    e.preventDefault()
  }

  return { addTeam, dispatch, removeTeam, state }
}

export { useTeamState }
