import { MetaTags } from '@redwoodjs/web'

import NewUser from 'src/components/Admin/User/NewUser'

const NewUserPage = () => {
  return (
    <>
      <MetaTags title="New User" />
      <NewUser />
    </>
  )
}

export default NewUserPage
