import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const Profile = (props) => {
  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={props.onSave} error={props.error}>
        <FormError
          error={props.error}
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
          defaultValue={props.profile?.name}
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
          defaultValue={props.profile?.nickname}
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
          defaultValue={props.profile?.pronouns}
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
          defaultValue={props.profile?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="email" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export { Profile }
