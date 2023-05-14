import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import RoleForm from 'src/components/Admin/Role/RoleForm'

const CREATE_ROLE_MUTATION = gql`
  mutation CreateRoleMutation($input: CreateRoleInput!) {
    createRole(input: $input) {
      id
    }
  }
`

const NewRole = () => {
  const [createRole, { loading, error }] = useMutation(CREATE_ROLE_MUTATION, {
    onCompleted: () => {
      toast.success('Role created')
      navigate(routes.adminRoles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createRole({ variables: { input } })
  }

  return (
    <div className="flex max-w-[500px] flex-col text-blackBean">
      <h2 className="my-5 font-sans text-2xl font-bold">Add Role</h2>
      <RoleForm onSave={onSave} loading={loading} error={error} />
    </div>
  )
}

export default NewRole
