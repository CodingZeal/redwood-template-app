import { MetaTags } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

import { EditEmailForm } from './EditEmailForm'

const Update_EMAIL_MUTATION = gql`
  mutation UpdateEmailMutation($input: UpdateEmailInput!) {
    updateEmail(input: $input)
  }
`

const EditEmail = ({ profile }) => {
  const { reauthenticate } = useAuth()

  const [updateEmail, { loading, error }] = useMutation(Update_EMAIL_MUTATION, {
    onCompleted: async () => {
      await reauthenticate()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (input) => {
    if (input.newEmail === profile.email) {
      return null
    }
    updateEmail({ variables: { input } })
    toast.success(
      `We have sent an email to: ${input.newEmail}. Please check your email for this message and verify your change by clicking on the verification link.`
    )
  }

  return (
    <>
      <MetaTags
        title={`${
          profile?.nickname || profile?.name || profile?.email
        } | Edit Email`}
      />
      <div className="rw-segment" id="edit-email">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Edit Email</h2>
        </header>
        <div className="rw-segment-main">
          <EditEmailForm error={error} loading={loading} onSubmit={onSubmit} />
        </div>
      </div>
    </>
  )
}

export { EditEmail }
