import type { EditTeamById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { CellSuccessProps, CellFailureProps, MetaTags } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TeamForm from 'src/components/Admin/Team/TeamForm'

export const QUERY = gql`
  query EditTeamById($id: String!) {
    team: team(id: $id) {
      id
      name
      active
    }
  }
`
const UPDATE_TEAM_MUTATION = gql`
  mutation UpdateTeamMutation($id: String!, $input: UpdateTeamInput!) {
    updateTeam(id: $id, input: $input) {
      id
      name
      active
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ team }: CellSuccessProps<EditTeamById>) => {
  const [updateTeam, { loading, error }] = useMutation(UPDATE_TEAM_MUTATION, {
    onCompleted: () => {
      toast.success('Team updated')
      navigate(routes.adminTeams())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateTeam({ variables: { id, input } })
  }

  return (
    <>
      <MetaTags title={`${team.name} | Edit Team`} />
      <div className="flex max-w-[500px] flex-col text-blackBean">
        <h2 className="my-5 font-sans text-2xl font-bold">
          Edit Team {team.id}
        </h2>
        <TeamForm team={team} onSave={onSave} error={error} loading={loading} />
      </div>
    </>
  )
}
