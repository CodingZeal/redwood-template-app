import { useEffect, useRef } from 'react'

import { Form, Label, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const VERIFY_RESET_MUTATION = gql`
  mutation VerificationResetMutation($email: String!) {
    email: verifyReset(email: $email)
  }
`

const VerificationResetPage = ({ email }) => {
  const [verifyReset, { loading }] = useMutation(VERIFY_RESET_MUTATION, {
    onCompleted: (response) => {
      toast.success(
        'A link to verify your account was sent to ' + response.email
      )
      navigate(routes.login())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const emailRef = useRef<HTMLInputElement>()
  useEffect(() => {
    emailRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    verifyReset({ variables: { email: data.email } })
  }

  return (
    <>
      <MetaTags title="Forgot Password" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">
                Resend Verification Email
              </h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <div className="text-left">
                    <Label
                      name="email"
                      className="rw-label"
                      errorClassName="rw-label rw-label-error"
                    >
                      Email
                    </Label>
                    <TextField
                      name="email"
                      className="rw-input"
                      errorClassName="rw-input rw-input-error"
                      defaultValue={email}
                      ref={emailRef}
                      validation={{
                        required: true,
                      }}
                    />

                    <FieldError name="email" className="rw-field-error" />
                  </div>

                  <div className="rw-button-group">
                    <Submit
                      disabled={loading}
                      className="rw-button rw-button-blue"
                    >
                      Send Email
                    </Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default VerificationResetPage
