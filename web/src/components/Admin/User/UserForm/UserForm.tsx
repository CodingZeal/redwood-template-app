import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  Submit,
  useForm,
} from '@redwoodjs/forms'

import UserFormTeamsCell from '../UserFormTeamsCell'

const UserForm = (props) => {
  const formMethods = useForm()
  const { setValue } = formMethods

  const onSubmit = (data) => {
    props.onSave(data, props.user?.id)
  }

  const roleName = (teamId, roleId) => `${teamId},${roleId}`

  return (
    <div className="rw-form-wrapper">
      <Form formMethods={formMethods} onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>

        <TextField
          name="email"
          defaultValue={props.user?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="email" className="rw-field-error" />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.user?.name}
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
          defaultValue={props.user?.nickname}
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
          defaultValue={props.user?.pronouns}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="pronouns" className="rw-field-error" />

        <Label
          name="active"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Active
        </Label>

        <CheckboxField
          name="active"
          defaultChecked={props.user?.active}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="active" className="rw-field-error" />

        <Label
          name="admin"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Admin
        </Label>

        <CheckboxField
          name="admin"
          defaultChecked={props.user?.admin}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="admin" className="rw-field-error" />

        <UserFormTeamsCell
          roleIds={(props.user?.memberships || [])
            .map((membership) =>
              (membership?.membershipRoles || []).map((membershipRole) =>
                roleName(membership.teamId, membershipRole.roleId)
              )
            )
            .flat()}
          roleName={roleName}
          setValue={setValue}
          teamIds={(props.user?.memberships || []).map(
            (membership) => membership.teamId
          )}
        />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default UserForm
