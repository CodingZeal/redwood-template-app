import { useRef } from 'react'

import {
  FieldError,
  Form,
  FormError,
  Label,
  PasswordField,
  Submit,
  useForm,
} from '@redwoodjs/forms'

const EditPasswordForm = ({ error, loading, onSave }) => {
  const formMethods = useForm()
  const newPasswordRef = useRef()

  newPasswordRef.current = formMethods.watch('newPassword', '')

  return (
    <div>
      <Form onSubmit={onSave} error={error} formMethods={formMethods}>
        <FormError
          error={error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="existingPassword"
          className="rw-label text-blackBean"
          errorClassName="rw-label rw-label-error"
        >
          Your Existing Password
        </Label>
        <PasswordField
          name="existingPassword"
          className="rw-input text-blackBean"
          errorClassName="rw-input rw-input-error"
          validation={{
            required: {
              value: true,
              message: 'Existing Password is required',
            },
          }}
          autoComplete="current-password"
        />
        <FieldError name="existingPassword" className="rw-field-error" />

        <Label
          name="newPassword"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          New Password
        </Label>
        <PasswordField
          name="newPassword"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{
            required: {
              value: true,
              message: 'New Password is required',
            },
          }}
          autoComplete="new-password"
        />
        <FieldError name="newPassword" className="rw-field-error" />

        <Label
          name="confirmPassword"
          className="rw-label text-blackBean"
          errorClassName="rw-label rw-label-error"
        >
          Confirm New Password
        </Label>
        <PasswordField
          name="confirmPassword"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{
            required: {
              value: true,
              message: 'Confirm New Password is required',
            },
            validate: (value: string) => {
              if (value !== newPasswordRef.current) {
                return 'Does not match New Password'
              }
            },
          }}
          autoComplete="new-password"
        />
        <FieldError name="confirmPassword" className="rw-field-error" />

        <div className="my-4 flex">
          <Submit
            disabled={loading}
            className="flex h-12 items-center justify-center rounded-lg border-2 border-rustyOrange bg-rustyOrange px-10 font-sans text-lg font-bold text-white"
          >
            Update Password
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export { EditPasswordForm }
