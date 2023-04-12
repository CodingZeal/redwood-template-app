import { MetaTags } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { EditPasswordForm } from './EditPasswordForm'

const UPDATE_PASSWORD_MUTATION = gql`
  mutation UpdatePasswordMutation($input: UpdatePasswordInput!) {
    updatePassword(input: $input)
  }
`

const EditPassword = ({ profile }) => {
  const [updatePassword, { loading, error }] = useMutation(
    UPDATE_PASSWORD_MUTATION,
    {
      onCompleted: () => {
        toast.success('Password updated')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )
  const onSave = (input) => {
    updatePassword({ variables: { input } })
  }

  return (
    <>
      <MetaTags
        title={`${
          profile?.nickname || profile?.name || profile?.email
        } | Edit Password`}
      />
      <div className="my-10 flex max-w-[500px] flex-col px-10 text-blackBean">
        <h2 className="font-sans text-5xl font-bold">Edit Password</h2>
        <EditPasswordForm error={error} loading={loading} onSave={onSave} />
      </div>
    </>
  )
}

export { EditPassword }
