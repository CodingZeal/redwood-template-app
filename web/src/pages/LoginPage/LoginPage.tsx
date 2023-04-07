import { useRef } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { ZealLogo } from 'src/components/ZealLogo'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()

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
    const response = await logIn({ ...data })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      if (response.error === 'User not Verified') {
        navigate(routes.verificationReset({ email: data.username }))
      }
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    <>
      <MetaTags title="Login" />
      <div className="grid w-full grid-cols-2 items-start py-10">
        <main className="font-inter m-auto w-[410px]" data-testid="login-page">
          <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
          <div className="text-blackBean">
            <h2 className="font-sans text-[90px] font-bold">Login</h2>

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

              <div className="flex flex-row items-end justify-between">
                <Label
                  name="password"
                  className="rw-label text-blackBean"
                  errorClassName="rw-label rw-label-error"
                >
                  Password
                </Label>
                <Link to={routes.forgotPassword()} className="underline">
                  Forgot Password?
                </Link>
              </div>

              <PasswordField
                name="password"
                placeholder="Enter your password"
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
                Login
              </Submit>
            </Form>
            <div className="flex justify-center">
              <span>Don&apos;t have an account?</span>
              <Link to={routes.signup()} className="px-1 underline">
                Sign up!
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

export default LoginPage
