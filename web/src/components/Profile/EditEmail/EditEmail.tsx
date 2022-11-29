import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { EditEmailForm } from './EditEmailForm'

const Verify_EMAIL_MUTATION = gql`
  mutation VerificationEmailMutation($input: UpdateEmailInput!) {
    verifyEmail(input: $input)
  }
`

const EditEmail = ({ profile }) => {
  const { reauthenticate } = useAuth()

  const [verifyEmail, { loading, error }] = useMutation(Verify_EMAIL_MUTATION, {
    onCompleted: async (input) => {
      await reauthenticate()
      toast.success(
        `We have sent an email to: ${input.email}. Please check your email for this message and verify your change by clicking on the verification link.`
      )
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (input) => {
    verifyEmail({ variables: { input } })
  }

  return (
    <>
      <MetaTags
        title={`${
          profile?.nickname || profile?.name || profile?.email
        } | Edit Email`}
      />
      <div className="rw-segment">
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
