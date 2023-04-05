import { useEffect, useRef } from 'react'

import { Form, Label, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { ZealLogo } from 'src/components/ZealLogo'

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const usernameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await forgotPassword(data.username)

    if (response.error) {
      toast.error(response.error)
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        'A link to reset your password was sent to ' + response.email
      )
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Forgot Password" />
      <div className="grid w-full grid-cols-2 py-10">
        <main className="m-auto w-[410px] font-sn ">
          <div className="text-blackBean">
            <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
            <h2 className="font-sans text-[90px] leading-none">
              Forgot Password?
            </h2>

            <Form onSubmit={onSubmit}>
              <Label
                name="username"
                className="rw-label text-blackBean"
                errorClassName="rw-label rw-label-error"
              >
                Username
              </Label>
              <TextField
                name="username"
                placeholder="Enter your username"
                className="rw-input text-blackBean"
                errorClassName="rw-input rw-input-error"
                ref={usernameRef}
                validation={{
                  required: true,
                }}
              />

              <FieldError name="username" className="rw-field-error" />

              <Submit className="my-5 h-12 w-full rounded-lg bg-rustyOrange text-white">
                Send me a Reset Email
              </Submit>
            </Form>
            <div className="flex justify-center ">
              <Link to={routes.login()} className="underline">
                Ready to Login!
              </Link>
            </div>
          </div>
        </main>
        <div className="mx-5">
          <ZealLogo />
        </div>
      </div>
    </>
  )
}

export default ForgotPasswordPage
