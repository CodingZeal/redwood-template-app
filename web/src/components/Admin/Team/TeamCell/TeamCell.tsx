import type { FindTeamById } from 'types/graphql'

import { CellSuccessProps, CellFailureProps, MetaTags } from '@redwoodjs/web'

import Team from 'src/components/Admin/Team/Team'

export const QUERY = gql`
  query FindTeamById($id: String!) {
    team: team(id: $id) {
      id
      name
      active
      updatedAt
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Team not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ team }: CellSuccessProps<FindTeamById>) => {
  return (
    <>
      <MetaTags title={`${team.name} | Team`} />
      <Team team={team} />
    </>
  )
}
