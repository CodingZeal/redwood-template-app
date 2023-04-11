import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/Role/RolesCell'
import { Archive } from 'src/components/Icon/Archive'
import { Eye } from 'src/components/Icon/Eye'
import { Pen } from 'src/components/Icon/Pen'

const DELETE_ROLE_MUTATION = gql`
  mutation DeleteRoleMutation($id: String!) {
    deleteRole(id: $id) {
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

const RolesList = ({ roles }) => {
  const [deleteRole] = useMutation(DELETE_ROLE_MUTATION, {
    onCompleted: () => {
      toast.success('Role deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete role ' + id + '?')) {
      deleteRole({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive font-int text-grey">
      <table className="rw-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => {
            const membershipRoleCount = role.membershipRoles.length
            return (
              <tr key={role.id}>
                <td>{truncate(role.name)}</td>
                <td>
                  <nav className="rw-table-actions opacity-50">
                    <Link
                      data-testid="showRole"
                      to={routes.adminRole({ id: role.id })}
                      title={'Show role ' + role.id + ' detail'}
                      className="rw-button rw-button-small"
                    >
                      <Eye />
                    </Link>
                    <Link
                      data-testid="editRole"
                      to={routes.adminEditRole({ id: role.id })}
                      title={'Edit role ' + role.id}
                      className="rw-button rw-button-small rw-button-blue"
                    >
                      <Pen />
                    </Link>
                    <button
                      type="button"
                      title={'Delete role ' + role.id}
                      className={`rw-button rw-button-small opacity-20 ${
                        membershipRoleCount === 0 && 'rw-button-red opacity-100'
                      }`}
                      onClick={() => onDeleteClick(role.id)}
                      disabled={membershipRoleCount > 0}
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

export default RolesList
