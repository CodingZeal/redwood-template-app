import { MetaTags } from '@redwoodjs/web'

import UserCell from 'src/components/Admin/User/UserCell'

type UserPageProps = {
  id: string
}

const UserPage = ({ id }: UserPageProps) => {
  return (
    <>
      <MetaTags title="User Detail" />
      <UserCell id={id} />
    </>
  )
}

export default UserPage
