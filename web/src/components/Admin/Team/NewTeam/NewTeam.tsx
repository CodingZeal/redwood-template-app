import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TeamForm from 'src/components/Admin/Team/TeamForm'

const CREATE_TEAM_MUTATION = gql`
  mutation CreateTeamMutation($input: CreateTeamInput!) {
    createTeam(input: $input) {
      id
    }
  }
`

const NewTeam = () => {
  const [createTeam, { loading, error }] = useMutation(CREATE_TEAM_MUTATION, {
    onCompleted: () => {
      toast.success('Team created')
      navigate(routes.adminTeams())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createTeam({ variables: { input } })
  }

  return (
    <div className="flex max-w-[500px] flex-col text-blackBean">
      <h2 className="my-5 font-sans text-2xl font-bold">New Team</h2>
      <TeamForm onSave={onSave} loading={loading} error={error} />
    </div>
  )
}

export default NewTeam
