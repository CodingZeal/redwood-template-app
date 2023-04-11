import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'

import UserFormTeamsCell from '../UserFormTeamsCell'

const UserForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props.user?.id)
  }

  const roleValue = (teamId, roleId) => `${teamId},${roleId}`

  const roleIds = (props.user?.memberships || [])
    .map((membership) =>
      (membership?.membershipRoles || []).map((membershipRole) =>
        roleValue(membership.teamId, membershipRole.roleId)
      )
    )
    .flat()

  const teamIds = (props.user?.memberships || []).map(
    (membership) => membership.teamId
  )

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
          name="email"
          className="rw-label font-int text-blackBean"
          errorClassName="rw-label rw-label-error"
        >
          Email*
        </Label>

        <TextField
          name="email"
          placeholder="Enter your email address"
          defaultValue={props.user?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="email" className="rw-field-error" />

        <Label
          name="name"
          className="rw-label font-int text-blackBean"
          errorClassName="rw-label rw-label-error"
        >
          Full Name*
        </Label>

        <TextField
          name="name"
          placeholder="Enter your full name"
          defaultValue={props.user?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="nickname"
          className="rw-label font-int text-blackBean"
          errorClassName="rw-label rw-label-error"
        >
          Preferred Name
        </Label>

        <TextField
          name="nickname"
          placeholder="Enter your preferred name"
          defaultValue={props.user?.nickname}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="nickname" className="rw-field-error" />

        <Label
          name="pronouns"
          className="rw-label font-int text-blackBean"
          errorClassName="rw-label rw-label-error"
        >
          Pronouns
        </Label>

        <TextField
          name="pronouns"
          placeholder="Enter your pronouns"
          defaultValue={props.user?.pronouns}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="pronouns" className="rw-field-error" />

        <Label
          name="active"
          className="rw-label font-int text-blackBean"
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
          className="rw-label font-int text-blackBean"
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
          roleIds={roleIds}
          roleValue={roleValue}
          teamIds={teamIds}
        />

        <div className="my-4 flex">
          <Submit
            disabled={props.loading}
            className="flex h-12 w-full items-center justify-center rounded-lg border-2 border-rustyOrange bg-rustyOrange font-sans text-lg font-bold text-white"
          >
            Add User
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default UserForm
