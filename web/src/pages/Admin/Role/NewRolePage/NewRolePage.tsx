import { MetaTags } from '@redwoodjs/web'

import NewRole from 'src/components/Admin/Role/NewRole'

const NewRolePage = () => {
  return (
    <>
      <MetaTags title="New Role" />
      <NewRole />
    </>
  )
}

export default NewRolePage
