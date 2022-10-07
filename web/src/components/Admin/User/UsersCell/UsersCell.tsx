import type { FindUsers } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

import { Users } from '../Users'

export const beforeQuery = ({
  showInactive = false,
}: {
  showInactive: boolean
}) => {
  const active = showInactive ? undefined : true
  return { variables: { active }, fetchPolicy: 'network-only' }
}

export const QUERY = gql`
  query FindUsers($active: Boolean) {
    users(active: $active) {
      id
      email
      name
      nickname
      pronouns
      active
      admin
      updatedAt
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No users yet. '}
      <Link to={routes.adminNewUser()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ users }: CellSuccessProps<FindUsers>) => {
  return <Users users={users} />
}
