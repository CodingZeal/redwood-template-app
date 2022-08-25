import type { FindRoleById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Role from 'src/components/Admin/Role/Role'

export const QUERY = gql`
  query FindRoleById($id: String!) {
    role: role(id: $id) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Role not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ role }: CellSuccessProps<FindRoleById>) => {
  return <Role role={role} />
}
