import { useEffect, useReducer, useState } from 'react'

import { HiddenField } from '@redwoodjs/forms'

const partition = (teams, selectedTeamIds) =>
  teams.reduce(
    (partitioned, team) => {
      return selectedTeamIds.includes(team.id)
        ? {
            ...partitioned,
            selectedTeams: [...partitioned.selectedTeams, team],
          }
        : {
            ...partitioned,
            unselectedTeams: [...partitioned.unselectedTeams, team],
          }
    },
    { selectedTeams: [], unselectedTeams: [] }
  )

const UserTeams = ({ originalTeamIds, setValue, teams }) => {
  const [teamToAdd, setTeamToAdd] = useState(null)
  const [state, dispatch] = useReducer(
    (state, action) => {
      const teamIds = (() => {
        switch (action.type) {
          case 'select':
            return [...state.teamIds, action.id]
          case 'unselect':
            return state.teamIds.filter((teamId) => teamId !== action.id)
          default:
            return state.teamIds
        }
      })()

      return {
        ...partition(teams, teamIds),
        teamIds,
      }
    },
    {
      ...partition(teams, originalTeamIds),
      teamIds: originalTeamIds,
    }
  )

  useEffect(() => {
    setValue('teamIds', state.teamIds)
  }, [setValue, state])

  const addTeam = (e) => {
    dispatch({ type: 'select', id: teamToAdd })
    e.preventDefault()
  }

  const removeTeam = (e) => {
    dispatch({ type: 'unselect', id: e.target.value })
    e.preventDefault()
  }

  return (
    <>
      <div className="rw-label">Teams</div>
      <HiddenField name="teamIds" />
      <table className="rw-table">
        <tbody>
          <tr>
            <td>
              <select
                name="addTeam"
                onChange={(e) => setTeamToAdd(e.target.value)}
              >
                <option>Select a Team to Add</option>
                {(state.unselectedTeams || []).map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <button
                className={`rw-button rw-button-small ${
                  !!teamToAdd && 'rw-button-blue'
                }`}
                onClick={addTeam}
                title={'Add Team'}
                disabled={!teamToAdd}
              >
                Add Team
              </button>
            </td>
          </tr>
          {(state.selectedTeams || []).map((team) => (
            <tr key={team.id}>
              <td>{team.name}</td>
              <td>
                <button
                  className="rw-button rw-button-small rw-button-red"
                  onClick={removeTeam}
                  title={'Remove Team ' + team.name}
                  value={team.id}
                >
                  Remove Team
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export { UserTeams }
