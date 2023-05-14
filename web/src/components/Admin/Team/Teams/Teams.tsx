import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/Team/TeamsCell'
import { Avatar } from 'src/components/Avatar'
import { Archive } from 'src/components/Icon/Archive'
import { Eye } from 'src/components/Icon/Eye'
import { Pen } from 'src/components/Icon/Pen'

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
    <div className="rw-segment rw-table-wrapper-responsive font-int text-grey">
      <table className="rw-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Members</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => {
            const userCount = team.memberships.length
            return (
              <tr key={team.id}>
                <td className="flex flex-row items-center text-white">
                  <Avatar user={team} className="mr-4" />
                  {truncate(team.name)}
                </td>
                <td>
                  <div className="flex flex-row-reverse justify-end">
                    {team.memberships?.map((membership) => {
                      return (
                        <div
                          className="z-10 -ml-2 rounded-full border-[1px]"
                          key={membership.user?.id}
                        >
                          <Avatar user={membership?.user} />
                        </div>
                      )
                    })}
                  </div>
                </td>
                <td>{truncate(team.active) && 'Active'}</td>
                <td>
                  <nav className="rw-table-actions opacity-50">
                    <Link
                      data-testid="showTeam"
                      to={routes.adminTeam({ id: team.id })}
                      title={'Show team ' + team.id + ' detail'}
                      className="rw-button rw-button-small"
                    >
                      <Eye />
                    </Link>
                    <Link
                      data-testid="editTeam"
                      to={routes.adminEditTeam({ id: team.id })}
                      title={'Edit team ' + team.id}
                      className="rw-button rw-button-small rw-button-blue"
                    >
                      <Pen />
                    </Link>
                    <button
                      type="button"
                      title={'Delete team ' + team.id}
                      className={`rw-button rw-button-small opacity-20 ${
                        userCount == 0 && 'rw-button-red opacity-100'
                      }`}
                      onClick={() => onDeleteClick(team.id)}
                      disabled={userCount > 0}
                    >
                      <Archive />
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
