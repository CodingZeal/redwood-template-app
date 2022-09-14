import type { FindRoleById } from 'types/graphql'

import { CellSuccessProps, CellFailureProps, MetaTags } from '@redwoodjs/web'

import Role from 'src/components/Admin/Role/Role'

export const QUERY = gql`
  query FindRoleById($id: String!) {
    role: role(id: $id) {
      id
      name
      membershipRoles {
        id
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Role not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ role }: CellSuccessProps<FindRoleById>) => {
  return (
    <>
      <MetaTags title={`${role.name} | Role`} />
      <Role role={role} />
    </>
  )
}
