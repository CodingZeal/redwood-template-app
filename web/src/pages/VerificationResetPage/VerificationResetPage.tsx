import { useEffect, useRef } from 'react'

import { Form, Label, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { ZealLogo } from 'src/components/ZealLogo'

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

      <div className="grid w-full grid-cols-2 py-10">
        <main className="m-auto w-[410px] font-sn">
          <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
          <div className="text-blackBean">
            <h2 className="font-sans text-[80px] leading-none">
              Resend Verification Email
            </h2>

            <Form onSubmit={onSubmit} className="rw-form-wrapper">
              <div className="text-left">
                <Label
                  name="email"
                  className="rw-label text-blackBean"
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

              <Submit
                disabled={loading}
                className="my-5 h-12 w-full rounded-lg bg-rustyOrange text-white"
              >
                Send Email
              </Submit>
            </Form>
          </div>
        </main>
        <div className="mx-5">
          <ZealLogo />
        </div>
      </div>
    </>
  )
}

export default VerificationResetPage
