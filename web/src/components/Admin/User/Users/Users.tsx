import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/User/UsersCell'

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
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Name</th>
            <th>Nickname</th>
            <th>Pronouns</th>
            <th>Active</th>
            <th>Admin</th>
            <th>Updated at</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{truncate(user.id)}</td>
              <td>{truncate(user.email)}</td>
              <td>{truncate(user.name)}</td>
              <td>{truncate(user.nickname)}</td>
              <td>{truncate(user.pronouns)}</td>
              <td>{checkboxInputTag('active', user.active)}</td>
              <td>{checkboxInputTag('admin', user.admin)}</td>
              <td>{timeTag(user.updatedAt)}</td>
              <td>{timeTag(user.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminUser({ id: user.id })}
                    title={'Show user ' + user.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditUser({ id: user.id })}
                    title={'Edit user ' + user.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
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
                    {user.active ? 'Archive' : 'Reactivate'}
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
