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
      <div className="rw-segment text-blackBean">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary text-blackBean">
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
      <nav className="my-4 flex flex-row items-center">
        <div className="flex h-12 items-center justify-center rounded-lg border-2 border-seaFoam bg-seaFoam px-8 font-sans text-lg font-bold text-white">
          <Link to={routes.adminEditRole({ id: role.id })}>Edit</Link>
        </div>
        {membershipRoleCount === 0 && (
          <button
            type="button"
            className="mx-5 text-red-500 underline"
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
