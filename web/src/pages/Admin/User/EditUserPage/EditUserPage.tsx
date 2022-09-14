import { MetaTags } from '@redwoodjs/web'

import EditUserCell from 'src/components/Admin/User/EditUserCell'

type UserPageProps = {
  id: string
}

const EditUserPage = ({ id }: UserPageProps) => {
  return (
    <>
      <MetaTags title="Edit User" />
      <EditUserCell id={id} />
    </>
  )
}

export default EditUserPage
