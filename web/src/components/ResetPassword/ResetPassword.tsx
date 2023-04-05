import { useEffect, useRef, useState } from 'react'

import {
  Form,
  Label,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

import { ZealLogo } from '../ZealLogo'

const ResetPassword = ({ resetToken, title, message }) => {
  const { isAuthenticated, reauthenticate, validateResetToken, resetPassword } =
    useAuth()

  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  useEffect(() => {
    const validateToken = async () => {
      const response = await validateResetToken(resetToken)

      if (response.error) {
        setEnabled(false)
        toast.error(response.error)
      } else {
        setEnabled(true)
      }
    }
    validateToken()
  }, [resetToken, validateResetToken])

  const passwordRef = useRef<HTMLInputElement>()
  useEffect(() => {
    passwordRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await resetPassword({
      resetToken,
      password: data.password,
    })
    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Password changed!')
      await reauthenticate()
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Reset Password" />
      <div className="grid w-full grid-cols-2 items-start py-10">
        <main className="m-auto w-[410px] font-sn">
          <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
          <div className="text-blackBean">
            <h2 className="font-sans text-[90px] leading-none">{title}</h2>

            <Form onSubmit={onSubmit}>
              <Label
                name="password"
                className="rw-label text-blackBean"
                errorClassName="rw-label rw-label-error"
              >
                {message}
              </Label>
              <PasswordField
                name="password"
                autoComplete="new-password"
                className="rw-input"
                errorClassName="rw-input rw-input-error"
                disabled={!enabled}
                ref={passwordRef}
                validation={{
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
                }}
              />

              <FieldError name="password" className="rw-field-error" />

              <Submit
                className="my-5 h-12 w-full rounded-lg bg-rustyOrange text-white"
                disabled={!enabled}
              >
                Reset Password
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

export { ResetPassword }
