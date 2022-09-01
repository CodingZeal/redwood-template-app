import { useEffect, useReducer, useState } from 'react'

import { CheckboxField, HiddenField } from '@redwoodjs/forms'

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

const UserFormTeams = ({
  roleIds,
  roleName,
  roles,
  setValue,
  teamIds,
  teams,
}) => {
  const [teamToAdd, setTeamToAdd] = useState(null)
  const [state, dispatch] = useReducer(
    (state, action) => {
      const newTeamIds = (() => {
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
        ...partition(teams, newTeamIds),
        teamIds: newTeamIds,
      }
    },
    {
      ...partition(teams, teamIds),
      teamIds,
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
      <div className="flex">
        <select name="addTeam" onChange={(e) => setTeamToAdd(e.target.value)}>
          <option>Select a Team to Add</option>
          {(state.unselectedTeams || []).map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
        <button
          className={`rw-button rw-button-small ${
            !!teamToAdd && 'rw-button-green'
          }`}
          onClick={addTeam}
          title={'Add Team'}
          disabled={!teamToAdd}
        >
          Add Team
        </button>
      </div>
      <table className="rw-table">
        <thead>
          <tr>
            <th>Team</th>
            <th>Roles</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {(state.selectedTeams || []).map((team) => (
            <tr key={team.id}>
              <td>{team.name}</td>
              <td>
                {(roles || []).map((role) => {
                  const name = roleName(team.id, role.id)
                  return (
                    <label key={role.id} htmlFor={name} className="rw-label">
                      <CheckboxField
                        name="roleIds"
                        className="rw-input"
                        defaultChecked={roleIds.includes(name)}
                        value={name}
                      />
                      {role.name}
                    </label>
                  )
                })}
              </td>
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

export { UserFormTeams }
