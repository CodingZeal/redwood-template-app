import { useRef, useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { ZealLogo } from 'src/components/ZealLogo'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  // focus on email box on page load
  const usernameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await signUp({ ...data })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome!')
    }
  }

  return (
    <>
      <MetaTags title="Signup" />
      <div className="grid w-full grid-cols-2 py-10">
        <main className="font-inter m-auto w-[410px]">
          <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
          <div className="text-blackBean">
            <h2 className="font-sans text-[90px] font-bold">Signup</h2>

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
                className="rw-input"
                errorClassName="rw-input rw-input-error"
                ref={usernameRef}
                validation={{
                  required: {
                    value: true,
                    message: 'Username is required',
                  },
                }}
              />
              <FieldError name="username" className="rw-field-error" />

              <Label
                name="password"
                className="rw-label text-blackBean"
                errorClassName="rw-label rw-label-error"
              >
                Password
              </Label>
              <PasswordField
                name="password"
                className="rw-input"
                errorClassName="rw-input rw-input-error"
                autoComplete="current-password"
                validation={{
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
                }}
              />
              <FieldError name="password" className="rw-field-error" />

              <Submit className="my-5 h-12 w-full rounded-lg bg-rustyOrange font-sans text-lg font-bold text-white">
                Sign Up
              </Submit>
            </Form>
            <div className="flex justify-center">
              <span>Already have an account?</span>
              <Link to={routes.login()} className="px-1 underline">
                Log in!
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

export default SignupPage
