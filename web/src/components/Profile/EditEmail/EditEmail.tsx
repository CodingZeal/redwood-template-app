import { MetaTags } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { EditEmailForm } from './EditEmailForm'

const UPDATE_EMAIL_MUTATION = gql`
  mutation UpdateEmailMutation($input: UpdateEmailInput!) {
    updateEmail(input: $input)
  }
`

const EditEmail = ({ profile }) => {
  const [updateEmail, { loading, error }] = useMutation(UPDATE_EMAIL_MUTATION, {
    onCompleted: () => {
      toast.success(
        `We have sent an email to: ${profile.updateEmail}. Please check your email for this message and verify your change by clicking on the verification link.`
      )
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const onSave = (input) => {
    updateEmail({ variables: { input } })
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
          <h2 className="rw-heading rw-heading-secondary">
            Requires verification of new value via email message
          </h2>
        </header>
        <div className="rw-segment-main">
          <EditEmailForm error={error} loading={loading} onSave={onSave} />
        </div>
      </div>
    </>
  )
}

export { EditEmail }
