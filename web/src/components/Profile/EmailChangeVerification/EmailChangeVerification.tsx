import { useEffect } from 'react'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

const UPDATE_EMAIL_MUTATION = gql`
  mutation UpdateEmailMutation($token: String!) {
    updateEmail: updateEmail(token: $token)
  }
`
const EmailChangeVerification = ({ token }) => {
  const [updateEmail, { loading, error }] = useMutation(UPDATE_EMAIL_MUTATION, {
    onCompleted: () => {
      toast.success('Account Verified')
      navigate(routes.login())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  useEffect(() => {
    updateEmail({ variables: { token } })
  }, [updateEmail, token])

  return (
    <>
      <MetaTags title="Verify Account" />
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Verify Email Change
          </h2>
        </header>
        <div className="rw-segment-main">
          <p>
            {loading && 'Loading...'}
            {error && 'Error, unable to verify account'}
          </p>
        </div>
      </div>
    </>
  )
}

export { EmailChangeVerification }
