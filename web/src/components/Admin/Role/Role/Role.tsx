import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_ROLE_MUTATION = gql`
  mutation DeleteRoleMutation($id: String!) {
    deleteRole(id: $id) {
      id
    }
  }
`

const Role = ({ role }) => {
  const [deleteRole] = useMutation(DELETE_ROLE_MUTATION, {
    onCompleted: () => {
      toast.success('Role deleted')
      navigate(routes.adminRoles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete role ' + id + '?')) {
      deleteRole({ variables: { id } })
    }
  }

  const membershipRoleCount = role.membershipRoles.length

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Role {role.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th scope="row">Id</th>
              <td>{role.id}</td>
            </tr>
            <tr>
              <th scope="row">Name</th>
              <td>{role.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditRole({ id: role.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        {membershipRoleCount === 0 && (
          <button
            type="button"
            className="rw-button rw-button-red"
            onClick={() => onDeleteClick(role.id)}
          >
            Delete
          </button>
        )}
      </nav>
    </>
  )
}

export default Role
