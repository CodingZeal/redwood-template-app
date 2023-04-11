import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_TEAM_MUTATION = gql`
  mutation DeleteTeamMutation($id: String!) {
    deleteTeam(id: $id) {
      id
    }
  }
`

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

const Team = ({ team }) => {
  const [deleteTeam] = useMutation(DELETE_TEAM_MUTATION, {
    onCompleted: () => {
      toast.success('Team deleted')
      navigate(routes.adminTeams())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete team ' + id + '?')) {
      deleteTeam({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment text-blackBean">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary text-blackBean">
            Team {team.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th scope="row">Id</th>
              <td>{team.id}</td>
            </tr>
            <tr>
              <th scope="row">Name</th>
              <td>{team.name}</td>
            </tr>
            <tr>
              <th scope="row">Active</th>
              <td>{checkboxInputTag(team.active)}</td>
            </tr>
            <tr>
              <th scope="row">Updated at</th>
              <td>{timeTag(team.updatedAt)}</td>
            </tr>
            <tr>
              <th scope="row">Created at</th>
              <td>{timeTag(team.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="my-4 flex flex-row items-center">
        <div className="flex h-12 items-center justify-center rounded-lg border-2 border-seaFoam bg-seaFoam px-8 font-sans text-lg font-bold text-white">
          <Link to={routes.adminEditTeam({ id: team.id })}>Edit</Link>
        </div>
        <button
          type="button"
          className="mx-5 text-red-500 underline"
          onClick={() => onDeleteClick(team.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Team
