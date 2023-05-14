import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/User/UsersCell'
import { Avatar } from 'src/components/Avatar'
import { Archive } from 'src/components/Icon/Archive'
import { Check } from 'src/components/Icon/Check'
import { Eye } from 'src/components/Icon/Eye'
import { Pen } from 'src/components/Icon/Pen'

const ARCHIVE_USER_MUTATION = gql`
  mutation ArchiveUserMutation($id: String!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
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

const Users = ({ users }) => {
  const [archiveUser] = useMutation(ARCHIVE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User updated')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onArchiveClick = (id, active) => {
    if (confirm('Are you sure you want to archive user ' + id + '?')) {
      archiveUser({
        variables: {
          id: id,
          input: { active: !active },
        },
      })
    }
  }
  return (
    <div className="rw-segment rw-table-wrapper-responsive font-int text-grey">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Team</th>
            <th>Role</th>
            <th>Email</th>
            <th>Status</th>
            <th>Admin</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="flex flex-row items-center">
                <Avatar user={user} className="mr-4" />
                {truncate(user.name)}
              </td>
              <td>
                {truncate(
                  user.memberships
                    ?.map((membership) => membership.team.name)
                    .join(', ')
                )}
              </td>
              <td>
                {truncate(
                  user.memberships
                    ?.map((membership) =>
                      membership.membershipRoles?.map((role) => role.role.name)
                    )
                    .join(', ')
                )}
              </td>
              <td>{truncate(user.email)}</td>
              <td>{truncate(user.active) && 'Active'}</td>
              <td>{truncate(user.admin) && <Check />}</td>

              <td>
                <nav className="rw-table-actions opacity-50">
                  <Link
                    data-testid="showUser"
                    to={routes.adminUser({ id: user.id })}
                    title={'Show user ' + user.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    <Eye />
                  </Link>
                  <Link
                    data-testid="editUser"
                    to={routes.adminEditUser({ id: user.id })}
                    title={'Edit user ' + user.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    <Pen />
                  </Link>

                  <button
                    type="button"
                    title={`${user.active ? 'Archive' : 'Reactivate'} user ${
                      user.name
                    }`}
                    className={
                      user.active
                        ? 'rw-button rw-button-small rw-button-red'
                        : 'rw-button rw-button-small'
                    }
                    onClick={() => onArchiveClick(user.id, user.active)}
                  >
                    <Archive />
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { Users }
