import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const RoleForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.role?.id)
  }

  return (
    <div>
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label font-int text-blackBean"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          placeholder="Enter role name"
          defaultValue={props.role?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <div className="my-4 flex">
          <Submit
            disabled={props.loading}
            className="flex h-12 w-full items-center justify-center rounded-lg border-2 border-rustyOrange bg-rustyOrange font-sans text-lg font-bold text-white"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default RoleForm
