import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/User/UsersCell'

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: String!) {
    deleteUser(id: $id) {
      id
    }
  }
`
const ARCHIVE_USER_MUTATION = gql`
  mutation ArchiveUserMutation($id: String!, $input: UpdateUserInput!) {
    archiveUser(id: $id, input: $input) {
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

const UsersList = ({ users }) => {
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
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
  const [archiveUser] = useMutation(ARCHIVE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User archived')
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete user ' + id + '?')) {
      deleteUser({ variables: { id } })
    }
  }
  const onArchiveClick = (id) => {
    if (confirm('Are you sure you want to archive user ' + id + '?')) {
      archiveUser({
        variables: {
          id: users.id,
          input: { active: !users.active },
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
              <td>{checkboxInputTag(user.active)}</td>
              <td>{checkboxInputTag(user.admin)}</td>
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
                    title={'Delete user ' + user.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(user.id)}
                  >
                    Delete
                  </button>

                  <button
                    type="button"
                    title={'Archive user ' + user.id}
                    className={
                      user.active
                        ? 'rw-button rw-button-small rw-button-red'
                        : 'rw-button rw-button-small'
                    }
                    onClick={() => onArchiveClick(user.id)}
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

export default UsersList
