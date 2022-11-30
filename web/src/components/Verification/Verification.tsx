import { useEffect } from 'react'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

const VERIFY_TOKEN_MUTATION = gql`
  mutation VerifyEmailMutation($token: String!) {
    verifyEmail: verifyEmail(token: $token)
  }
`
const Verification = ({ token }) => {
  const [verifyEmail, { loading, error }] = useMutation(VERIFY_TOKEN_MUTATION, {
    onCompleted: () => {
      toast.success('Account Verified')
      navigate(routes.login())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  useEffect(() => {
    verifyEmail({ variables: { token } })
  }, [verifyEmail, token])

  return (
    <>
      <MetaTags title="Verify Account" />
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Verify Account</h2>
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

export { Verification }
