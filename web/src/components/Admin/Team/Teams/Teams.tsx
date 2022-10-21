import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/Team/TeamsCell'

const DELETE_TEAM_MUTATION = gql`
  mutation DeleteTeamMutation($id: String!) {
    deleteTeam(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const TeamsList = ({ teams }) => {
  const [deleteTeam] = useMutation(DELETE_TEAM_MUTATION, {
    onCompleted: () => {
      toast.success('Team deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete team ' + id + '?')) {
      deleteTeam({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Active</th>
            <th scope="col">User Count</th>
            <th scope="col">Updated at</th>
            <th scope="col">Created at</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => {
            const userCount = team.memberships.length
            return (
              <tr key={team.id}>
                <td>{truncate(team.id)}</td>
                <td>{truncate(team.name)}</td>
                <td>{checkboxInputTag(team.active)}</td>
                <td>{userCount}</td>
                <td>{timeTag(team.updatedAt)}</td>
                <td>{timeTag(team.createdAt)}</td>
                <td>
                  <nav className="rw-table-actions">
                    <Link
                      to={routes.adminTeam({ id: team.id })}
                      title={'Show team ' + team.id + ' detail'}
                      className="rw-button rw-button-small"
                    >
                      Show
                    </Link>
                    <Link
                      to={routes.adminEditTeam({ id: team.id })}
                      title={'Edit team ' + team.id}
                      className="rw-button rw-button-small rw-button-blue"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      title={'Delete team ' + team.id}
                      className={`rw-button rw-button-small ${
                        userCount == 0 && 'rw-button-red'
                      }`}
                      onClick={() => onDeleteClick(team.id)}
                      disabled={userCount > 0}
                    >
                      Delete
                    </button>
                  </nav>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TeamsList
