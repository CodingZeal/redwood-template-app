import { MetaTags } from '@redwoodjs/web'

import RolesCell from 'src/components/Admin/Role/RolesCell'

const RolesPage = () => {
  return (
    <>
      <MetaTags title="Roles" />
      <RolesCell />
    </>
  )
}

export default RolesPage
