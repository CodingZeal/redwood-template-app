import { CellFailureProps, CellSuccessProps, MetaTags } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

import { EditProfile } from '../EditProfile'

export const beforeQuery = (props) => {
  return {
    variables: props,
    fetchPolicy: 'no-cache',
  }
}

export const QUERY = gql`
  query Profile {
    profile {
      id
      email
      name
      nickname
      pronouns
    }
  }
`
const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfileMutation($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      id
      email
      name
      nickname
      pronouns
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ profile }: CellSuccessProps) => {
  const { reauthenticate } = useAuth()

  const [updateProfile, { loading, error }] = useMutation(
    UPDATE_PROFILE_MUTATION,
    {
      onCompleted: () => {
        reauthenticate()
        toast.success('Profile updated')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )
  const onSave = (input) => {
    updateProfile({ variables: { input } })
  }

  return (
    <>
      <MetaTags
        title={`${
          profile.nickname || profile.name || profile.email
        } | Edit Profile`}
      />
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Edit Profile</h2>
        </header>
        <div className="rw-segment-main">
          <EditProfile
            error={error}
            loading={loading}
            onSave={onSave}
            profile={profile}
          />
        </div>
      </div>
    </>
  )
}
