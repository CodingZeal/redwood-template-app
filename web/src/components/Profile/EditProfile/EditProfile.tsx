import {
  Form,
  FormError,
  FieldError,
  Label,
  InputField,
  Submit,
} from '@redwoodjs/forms'

const EditProfile = ({ error, loading, profile, onSave }) => {
  return (
    <div id="edit-profile">
      <Form onSubmit={onSave} error={error}>
        <FormError
          error={error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label text-blackBean"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <InputField
          name="name"
          defaultValue={profile.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="nickname"
          className="rw-label text-blackBean"
          errorClassName="rw-label rw-label-error"
        >
          Nickname
        </Label>

        <InputField
          name="nickname"
          defaultValue={profile.nickname}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="nickname" className="rw-field-error" />

        <Label
          name="pronouns"
          className="rw-label text-blackBean"
          errorClassName="rw-label rw-label-error"
        >
          Pronouns
        </Label>

        <InputField
          name="pronouns"
          defaultValue={profile.pronouns}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="pronouns" className="rw-field-error" />

        <div className="my-4 flex">
          <Submit
            disabled={loading}
            className="flex h-12 items-center justify-center rounded-lg border-2 border-rustyOrange bg-rustyOrange px-10 font-sans text-lg font-bold text-white"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export { EditProfile }
