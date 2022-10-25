import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const REMOVE_USER_MUTATION = gql`
  mutation RemoveUserMutation($id: String!) {
    removeUser(id: $id) {
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

const checkboxInputTag = (label, checked) => {
  return <input aria-label={label} type="checkbox" checked={checked} disabled />
}

const User = ({ user }) => {
  const [removeUser] = useMutation(REMOVE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User removed')
      navigate(routes.adminUsers())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onRemoveClick = (id) => {
    if (
      confirm(
        'Removing the user will remove all their personal data. Are you sure you want to remove user ' +
          id +
          '?'
      )
    ) {
      removeUser({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            User {user.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th scope="row">Id</th>
              <td>{user.id}</td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th scope="row">Name</th>
              <td>{user.name}</td>
            </tr>
            <tr>
              <th scope="row">Nickname</th>
              <td>{user.nickname}</td>
            </tr>
            <tr>
              <th scope="row">Pronouns</th>
              <td>{user.pronouns}</td>
            </tr>
            <tr>
              <th scope="row">Active</th>
              <td>{checkboxInputTag('active', user.active)}</td>
            </tr>
            <tr>
              <th scope="row">Admin</th>
              <td>{checkboxInputTag('admin', user.admin)}</td>
            </tr>
            <tr>
              <th scope="row">Verified</th>
              <td>{checkboxInputTag('verified', user.verified)}</td>
            </tr>
            <tr>
              <th scope="row">Teams</th>
              <td>
                {user.memberships
                  ?.map((membership) => membership.team.name)
                  .join(', ')}
              </td>
            </tr>
            <tr>
              <th scope="row">Updated at</th>
              <td>{timeTag(user.updatedAt)}</td>
            </tr>
            <tr>
              <th scope="row">Created at</th>
              <td>{timeTag(user.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditUser({ id: user.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onRemoveClick(user.id)}
        >
          Remove
        </button>
      </nav>
    </>
  )
}

export default User
