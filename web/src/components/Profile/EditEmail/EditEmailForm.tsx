import { useRef } from 'react'

import {
  FieldError,
  Form,
  FormError,
  Label,
  PasswordField,
  Submit,
  TextField,
  useForm,
} from '@redwoodjs/forms'

const EditEmailForm = ({ error, loading, onSave }) => {
  const formMethods = useForm()
  const newEmailRef = useRef()

  newEmailRef.current = formMethods.watch('newEmail', '')

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSave} error={error} formMethods={formMethods}>
        <FormError
          error={error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="password"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Your Password
        </Label>

        <PasswordField
          name="password"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{
            required: {
              value: true,
              message: 'Existing Password is required',
            },
          }}
          autoComplete="current-password"
        />
        <FieldError name="password" className="rw-field-error" />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Your New Email
        </Label>

        <TextField
          name="newEmail"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="newEmail" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={loading} className="rw-button rw-button-blue">
            Update Email
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export { EditEmailForm }
