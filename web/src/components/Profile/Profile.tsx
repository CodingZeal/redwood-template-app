import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const Profile = ({ user, onSave, error, loading }) => {
  const onSubmit = (data) => {
    onSave(data, user?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={error}>
        <FormError
          error={error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={user?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="nickname"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Nickname
        </Label>

        <TextField
          name="nickname"
          defaultValue={user?.nickname}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="nickname" className="rw-field-error" />

        <Label
          name="pronouns"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Pronouns
        </Label>

        <TextField
          name="pronouns"
          defaultValue={user?.pronouns}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="pronouns" className="rw-field-error" />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>

        <TextField
          name="email"
          defaultValue={user?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        {/* <FieldError name="password" className="rw-field-error" />

        <Label
          name="password"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Password
        </Label>

        <TextField
          name="password"
          defaultValue={props.user?.password}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="password" className="rw-field-error" /> */}

        <div className="rw-button-group">
          <Submit disabled={loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default Profile
