import { MetaTags } from '@redwoodjs/web'

import UsersCell from 'src/components/Admin/User/UsersCell'

const UsersPage = () => {
  return (
    <>
      <MetaTags title="Users" />
      <UsersCell />
    </>
  )
}

export default UsersPage
