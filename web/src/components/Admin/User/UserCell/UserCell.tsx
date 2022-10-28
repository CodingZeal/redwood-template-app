import type { FindUserById } from 'types/graphql'

import { CellFailureProps, CellSuccessProps, MetaTags } from '@redwoodjs/web'

import User from 'src/components/Admin/User/User'

export const QUERY = gql`
  query FindUserById($id: String!) {
    user: user(id: $id) {
      id
      email
      name
      nickname
      pronouns
      active
      admin
      updatedAt
      createdAt
      memberships {
        team {
          name
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>User not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ user }: CellSuccessProps<FindUserById>) => {
  return (
    <>
      <MetaTags title={`${user.name || user.email} | User`} />
      <User user={user} />
    </>
  )
}
